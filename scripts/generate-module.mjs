/**
 * Generator module theo architecture của project (thay cho `nest g resource`):
 *
 *   pnpm generate:module <tên-model-prisma> [route-path]
 *
 * Ví dụ:
 *   pnpm generate:module supplier            -> src/modules/suppliers, route /api/suppliers
 *   pnpm generate:module ImportOrder         -> src/modules/import-orders, route /api/import-orders
 *   pnpm generate:module category danh-muc   -> src/modules/danh-muc, route /api/danh-muc
 *
 * Script sẽ:
 *   1. Kiểm tra model tồn tại trong prisma/schema.prisma + DTO generated đã sinh
 *   2. Sinh 3 file: <name>.module.ts, <name>.controller.ts, <name>.service.ts (extends BaseCrudService)
 *   3. Tự đăng ký module mới vào imports của src/app.module.ts
 *   4. Chạy pretier --write cho các file vừa sinh
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = process.cwd();
const MODULES_DIR = path.join(ROOT, 'src/modules');
const SCHEMA_FILE = path.join(ROOT, 'prisma/schema.prisma');
const APP_MODULE_FILE = path.join(ROOT, 'src/app.module.ts');

// ==================== Tiện ích đặt tên ====================

function toWords(input) {
  return String(input)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_\s]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function deriveNames(modelName) {
  const words = toWords(modelName);
  if (!words.length) throw new Error('Tên model không hợp lệ');
  const pascal = words.map(capitalize).join('');
  const camel = words[0].toLowerCase() + words.slice(1).map(capitalize).join('');
  const kebab = words.map((w) => w.toLowerCase()).join('-');
  return { pascal, camel, kebab };
}

function pluralizeWord(word) {
  if (/(s|x|z|ch|sh)$/i.test(word)) return `${word}es`;
  if (/[^aeiou]y$/i.test(word)) return `${word.slice(0, -1)}ies`;
  return `${word}s`;
}

function pluralizeKebab(kebab) {
  const parts = kebab.split('-');
  parts[parts.length - 1] = pluralizeWord(parts[parts.length - 1]);
  return parts.join('-');
}

// ==================== Template ====================

function serviceTemplate({ pluralPascal, pascal, camel, pluralKebab }) {
  return `import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BaseCrudService } from '@/common/base/base-crud.service';
import { Create${pascal}Dto } from '@/generated/dto/create-${camel}.dto';
import { Update${pascal}Dto } from '@/generated/dto/update-${camel}.dto';
import { ${pascal} } from '@prisma/client';

// CRUD mặc định của BaseCrudService dùng luôn, không cần viết lại
// Muốn tùy chỉnh: override method tương ứng hoặc các hook nhỏ (getListWhere, transformCreateData...)
@Injectable()
export class ${pluralPascal}Service extends BaseCrudService<${pascal}, Create${pascal}Dto, Update${pascal}Dto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, '${camel}');
  }
}
`;
}

function controllerTemplate({ pluralPascal, pascal, camel, pluralKebab, routePath }) {
  const svcVar = serviceVarName(pluralPascal);
  return `import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ${pluralPascal}Service } from './${pluralKebab}.service';
import { Create${pascal}Dto } from '@/generated/dto/create-${camel}.dto';
import { Update${pascal}Dto } from '@/generated/dto/update-${camel}.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Controller('${routePath}')
export class ${pluralPascal}Controller {
  constructor(private readonly ${svcVar}: ${pluralPascal}Service) {}

  @Post()
  async create(@Body() payload: Create${pascal}Dto) {
    return await this.${svcVar}.create({ payload });
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.${svcVar}.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.${svcVar}.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: Update${pascal}Dto) {
    return await this.${svcVar}.update({ id, payload });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.${svcVar}.remove({ id });
  }
}
`;
}

function serviceVarName(pluralPascal) {
  return pluralPascal.charAt(0).toLowerCase() + pluralPascal.slice(1);
}

function moduleTemplate({ pluralPascal, pluralKebab }) {
  return `import { Module } from '@nestjs/common';
import { ${pluralPascal}Service } from './${pluralKebab}.service';
import { ${pluralPascal}Controller } from './${pluralKebab}.controller';

@Module({
  controllers: [${pluralPascal}Controller],
  providers: [${pluralPascal}Service],
})
export class ${pluralPascal}Module {}
`;
}

// ==================== Đăng ký vào AppModule ====================

function registerIntoAppModule(appModuleContent, { pluralPascal, pluralKebab }) {
  if (appModuleContent.includes(`${pluralPascal}Module`)) return appModuleContent;

  // Chèn dòng import sau import module cuối cùng
  const importRegex = /^import \{ \w+Module \} from '\.\/modules\/[^']+';[ \t]*$/gm;
  let lastImportEnd = -1;
  for (const match of appModuleContent.matchAll(importRegex)) {
    lastImportEnd = match.index + match[0].length;
  }
  if (lastImportEnd === -1) throw new Error("Không tìm thấy khối import module trong app.module.ts");
  const importLine = `import { ${pluralPascal}Module } from './modules/${pluralKebab}/${pluralKebab}.module';`;
  let content = appModuleContent.slice(0, lastImportEnd) + `\n${importLine}` + appModuleContent.slice(lastImportEnd);

  // Chèn vào mảng imports của @Module(), ngay trước dấu đóng "],"
  const arrStart = content.indexOf('imports: [');
  if (arrStart === -1) throw new Error("Không tìm thấy mảng 'imports' trong app.module.ts");
  const arrClose = content.indexOf('],', arrStart);
  if (arrClose === -1) throw new Error("Cấu trúc mảng 'imports' trong app.module.ts không đúng");
  content = content.slice(0, arrClose) + `    ${pluralPascal}Module,\n  ` + content.slice(arrClose);

  return content;
}

// ==================== Main ====================

function main() {
  const [rawModelName, customRoute] = process.argv.slice(2);
  if (!rawModelName || rawModelName === '--help') {
    console.log('Cách dùng: pnpm generate:module <tên-model-prisma> [route-path]');
    console.log('Ví dụ:     pnpm generate:module supplier | pnpm generate:module ImportOrder');
    process.exit(rawModelName === '--help' ? 0 : 1);
  }

  const { pascal, camel, kebab } = deriveNames(rawModelName);
  const routePath = customRoute || pluralizeKebab(kebab);
  const pluralKebab = routePath;
  const pluralPascal = pluralKebab.split('-').map(capitalize).join('');
  const ctx = { pascal, camel, kebab, pluralPascal, pluralKebab, routePath };

  // 1. Kiểm tra model trong schema.prisma
  const schema = fs.readFileSync(SCHEMA_FILE, 'utf8');
  if (!new RegExp(`^model\\s+${pascal}\\b`, 'm').test(schema)) {
    console.error(`✗ Không tìm thấy "model ${pascal}" trong prisma/schema.prisma`);
    process.exit(1);
  }

  // 2. Kiểm tra DTO generated đã tồn tại (chạy pnpm generate:dto trước khi generate module)
  for (const prefix of ['create', 'update']) {
    const dtoFile = path.join(ROOT, `src/generated/dto/${prefix}-${camel}.dto.ts`);
    if (!fs.existsSync(dtoFile)) {
      console.error(`✗ Không tìm thấy DTO: src/generated/dto/${prefix}-${camel}.dto.ts`);
      console.error('  Hãy chạy "pnpm generate:dto" trước khi generate module.');
      process.exit(1);
    }
  }

  // 3. Kiểm tra module chưa tồn tại
  const moduleDir = path.join(MODULES_DIR, pluralKebab);
  if (fs.existsSync(moduleDir)) {
    console.error(`✗ Module đã tồn tại: src/modules/${pluralKebab}`);
    process.exit(1);
  }
  fs.mkdirSync(moduleDir, { recursive: true });

  // 4. Sinh 3 file
  const files = [
    { name: `${pluralKebab}.service.ts`, content: serviceTemplate(ctx) },
    { name: `${pluralKebab}.controller.ts`, content: controllerTemplate(ctx) },
    { name: `${pluralKebab}.module.ts`, content: moduleTemplate(ctx) },
  ];
  for (const file of files) {
    fs.writeFileSync(path.join(moduleDir, file.name), file.content);
    console.log(`✓ Sinh file: src/modules/${pluralKebab}/${file.name}`);
  }

  // 5. Đăng ký vào AppModule
  const appModuleContent = fs.readFileSync(APP_MODULE_FILE, 'utf8');
  fs.writeFileSync(APP_MODULE_FILE, registerIntoAppModule(appModuleContent, ctx));
  console.log(`✓ Đăng ký ${pluralPascal}Module vào src/app.module.ts`);

  // 6. Format bằng prettier local để đảm bảo style đồng nhất
  const prettierBin = require.resolve('prettier/bin/prettier.cjs');
  spawnSync(process.execPath, [prettierBin, '--write', moduleDir, APP_MODULE_FILE], { stdio: 'pipe' });

  console.log(`\nHoàn tất! Route: /api/${routePath}\nNhớ restart dev server nếu đang chạy start:dev.`);
}

main();
