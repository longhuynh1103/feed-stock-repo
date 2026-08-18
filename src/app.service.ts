import { Injectable } from '@nestjs/common';
import { PrismaService } from './modules/prisma/prisma.service';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  private version: string = '0.0.0';
  private author: string = 'long.hg';

  constructor(private prisma: PrismaService) {
    // Tự động đọc version từ file package.json của dự án
    try {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      this.version = packageJson.version || '0.0.0';
      this.author = packageJson.author || 'long.hg';
    } catch (e) {
      // Bỏ qua nếu lỗi đọc file
    }
  }

  async getHealthCheck() {
    // 1. Tính toán dung lượng RAM tiêu thụ (Đổi byte sang MB)
    const memory = process.memoryUsage();
    const memoryUsage = {
      rss: `${(memory.rss / 1024 / 1024).toFixed(2)} MB`, // Tổng RAM NodeJs chiếm từ OS
      heapTotal: `${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`, // RAM thực tế đang dùng để chứa Object
    };

    // 2. Tính toán CPU Usage (Phần trăm sử dụng của luồng hiện tại)
    const cpuStartTime = process.cpuUsage();
    // Tạo độ trễ giả lập cực ngắn 5ms để đo lường tải CPU chính xác hơn
    await new Promise((resolve) => setTimeout(resolve, 5));
    const cpuDiff = process.cpuUsage(cpuStartTime);
    const totalCpuTime = (cpuDiff.user + cpuDiff.system) / 1000; // Đổi sang mili-giây

    // 3. Kiểm tra kết nối database thực tế
    const isDbConnected = await this.prisma.checkConnection();

    return {
      status: isDbConnected ? 'UP' : 'DOWN',
      pid: process.pid,
      version: this.version,
      author: this.author,
      uptime: `${process.uptime().toFixed(2)} seconds`, // Thời gian ứng dụng đã chạy liên tục
      cpuUsage: `${totalCpuTime.toFixed(4)}%`,
      memoryUsage,
      database: {
        connected: isDbConnected,
      },
      os: {
        platform: process.platform,
        arch: process.arch,
        totalMemory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        freeMemory: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
      },
    };
  }
}
