/**
 * Patch DTO sinh ra bởi prisma-generator-nestjs-dto:
 *   @IsDecimal()  ->  @Transform(number hoá) + @IsFlexibleDecimal()
 *
 * Lý do: generator hardcode @IsDecimal (chỉ nhận string) nhưng vẫn thêm
 * @Min/@Max (chỉ nhận number) -> cặp validator mâu thuẫn, create/update luôn fail.
 * Script này idempotent, chạy lại nhiều lần không sao. Chạy tự động trong `pnpm generate:dto`.
 */
import fs from 'node:fs';
import path from 'node:path';

const DTO_DIR = path.resolve(process.cwd(), 'src/generated/dto');

const TRANSFORM_DECORATOR = "@Transform(({ value }) => (typeof value === 'string' ? Number(value) : value))";
const FLEXIBLE_DECORATOR = '@IsFlexibleDecimal()';
const OLD_DECORATOR = '@IsDecimal()';
const IMPORT_LINES = ["import { Transform } from 'class-transformer';", "import { IsFlexibleDecimal } from '@/common/validators/is-flexible-decimal.decorator';"];

function removeUnusedIsDecimalImport(content) {
  // Nếu @IsDecimal đã không còn được dùng ở thân file thì bỏ khỏi danh sách import
  const bodyWithoutImports = content.replace(/^import[\s\S]*?from\s+'[^']+';?\s*$/gm, '');
  if (/\bIsDecimal\b/.test(bodyWithoutImports)) return content;

  return content.replace(/^(import\s*\{[^}]*\})([^;\n]*from\s+'class-validator';?)$/m, (full, braces, tail) => {
    const names = braces
      .replace(/^import\s*\{/, '')
      .replace(/\}$/, '')
      .split(',')
      .map((n) => n.trim())
      .filter((n) => n && n !== 'IsDecimal');
    if (!names.length) return '';
    return `import {\n${names.map((n) => `  ${n},`).join('\n')}\n}${tail}`;
  });
}

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes(OLD_DECORATOR)) return false;

  if (content.includes(FLEXIBLE_DECORATOR)) {
    // Đã patch trước đó nhưng có thể còn sót @IsDecimal ở phần relation -> vẫn thay nốt
    content = content.split(OLD_DECORATOR).join(FLEXIBLE_DECORATOR);
    fs.writeFileSync(filePath, removeUnusedIsDecimalImport(content));
    return true;
  }

  content = content
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed !== OLD_DECORATOR) return line;
      const indent = line.match(/^\s*/)[0];
      return `${indent}${TRANSFORM_DECORATOR}\n${indent}${FLEXIBLE_DECORATOR}`;
    })
    .join('\n');

  // Chèn import ngay sau dòng kết thúc của import cuối cùng (hỗ trợ import đa dòng)
  const lines = removeUnusedIsDecimalImport(content).split('\n');
  let importEndIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (!/^import\s/.test(lines[i])) continue;
    let j = i;
    while (j < lines.length && !/from\s+'[^']+'\s*;?\s*$/.test(lines[j])) j++;
    if (j >= lines.length) throw new Error(`Import không hợp lệ trong ${filePath}`);
    importEndIndex = j;
  }
  if (importEndIndex === -1) throw new Error(`Không tìm thấy khối import trong ${filePath}`);
  lines.splice(importEndIndex + 1, 0, ...IMPORT_LINES);

  fs.writeFileSync(filePath, lines.join('\n'));
  return true;
}

function main() {
  if (!fs.existsSync(DTO_DIR)) {
    console.error(`Không tìm thấy thư mục ${DTO_DIR}`);
    process.exit(1);
  }
  const files = fs.readdirSync(DTO_DIR).filter((f) => f.endsWith('.dto.ts') && /^(create|update)-/.test(f));
  let patchedCount = 0;
  for (const file of files) {
    if (patchFile(path.join(DTO_DIR, file))) {
      patchedCount++;
      console.log(`Patched: ${file}`);
    }
  }
  console.log(`Hoàn tất: ${patchedCount}/${files.length} file DTO được patch.`);
}

main();
