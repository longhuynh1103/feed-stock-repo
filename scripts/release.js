const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const semver = require('semver');
const Logger = require("./logger.js");

const logger = new Logger({ scope: 'RELEASE' });


// Đường dẫn tới các file cần cập nhật
const packageJsonPath = path.join(process.cwd(), 'package.json');
const releaseMdPath = path.join(process.cwd(), 'RELEASE.md');

function run() {
  try {
    // 1. Đọc phiên bản hiện tại từ package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const currentVersion = packageJson.version || '1.0.0';

    // 2. Xác định tag cuối cùng
    let lastTag = '';
    try {
      lastTag = execSync('git describe --tags --abbrev=0', { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
    } catch (e) {
      // Chưa từng có tag nào trong quá khứ
    }

    // 3. Lấy commit MỚI NHẤT 
    let gitLogCmd = '';
    if (lastTag) {
      // Nếu đã có tag, chỉ lấy những commit nằm giữa Tag đó và mã hiện tại (HEAD)
      gitLogCmd = `git log ${lastTag}..HEAD --pretty=format:"%s"`;
    } else {
      // Nếu CHƯA CÓ TAG, chỉ lấy các commit chưa được đẩy vào một đợt release nào (hoặc lấy commit của riêng lần này)
      // Để an toàn, kiểm tra xem có commit nào chưa tag không bằng cách so sánh với nhánh gốc
      gitLogCmd = 'git log --pretty=format:"%s"';
    }

    const logOutput = execSync(gitLogCmd).toString().trim();

    if (!logOutput) {
        logger.info('Không phát hiện commit mới nào kể từ lần release trước. Giữ nguyên version v' + currentVersion);
        return;
    }


    const commits = logOutput.split('\n').filter(Boolean);

    if (commits.length === 0) {
      logger.info('Không có commit mới nào kể từ đợt release trước. Huỷ release.');
      return;
    }

    // 4. THUẬT TOÁN THÔNG MINH: Phân tích Conventional Commits để quyết định nâng cấp Semantic Versioning
    // - BREAKING CHANGE hoặc feat!: nâng MAJOR (x.0.0)
    // - feat: hoặc minor: nâng MINOR (0.x.0)
    // - fix:, chore:, refactor:, docs:... nâng PATCH (0.0.x)
    let releaseType = 'patch'; 
    let descriptionList = [];

    for (const commit of commits) {
      descriptionList.push(`- ${commit}`);
      
      if (commit.includes('BREAKING CHANGE') || commit.match(/^[a-zA-Z]+!:/)) {
        releaseType = 'major';
      } else if (commit.startsWith('feat:') && releaseType !== 'major') {
        releaseType = 'minor';
      }
    }

    // Tính toán phiên bản mới dựa trên thuật toán quyết định bên trên
    const nextVersion = semver.inc(currentVersion, releaseType);
    logger.info(`Phát hiện release dạng [${releaseType.toUpperCase()}]. Nâng cấp từ v${currentVersion} → v${nextVersion}`);

    // 5. Lấy ngày giờ hiện tại theo giờ Việt Nam (ICT)
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      dateStyle: 'short',
      timeStyle: 'medium'
    });
    const releaseTime = formatter.format(now);

    // 6. Tạo nội dung Log mới cho file RELEASE.md
    const newReleaseContent = `## [v${nextVersion}] - ${releaseTime}\n\n**Loại thay đổi:** \`${releaseType.toUpperCase()}\`\n\n### Chi tiết thay đổi:\n${descriptionList.join('\n')}\n\n---\n\n`;

    // Ghi chèn nội dung mới lên đầu file RELEASE.md (Prepend)
    let existingContent = '';
    if (fs.existsSync(releaseMdPath)) {
      existingContent = fs.readFileSync(releaseMdPath, 'utf8');
    }
    fs.writeFileSync(releaseMdPath, newReleaseContent + existingContent, 'utf8');
    logger.success('Đã cập nhật lịch sử vào file RELEASE.md thành công.');

    // 7. Gắn phiên bản mới ngược lại vào package.json
    packageJson.version = nextVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
    logger.success('Đã gắn version mới vào file package.json thành công.');

    // 8. Tạo Git Tag tự động (Tùy chọn bổ trợ rất tiện cho PM2/Docker)
    execSync(`git add package.json RELEASE.md`);
    execSync(`git commit -m "chore(release): v${nextVersion}" --no-verify`, { stdio: 'ignore' });
    execSync(`git tag v${nextVersion}`);
    logger.success(`Đã tự động tạo Git Tag v${nextVersion} để chặn trùng cho lần sau!`);
  } catch (error) {
    logger.error('Lỗi trong quá trình chạy script tự động release:', error.message);
  }
}

run();
