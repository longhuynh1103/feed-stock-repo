import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { alsContext } from '@/common/context/als.context';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  private readonly logger = new Logger('RequestMiddleware');
  // Sử dụng kiểu dữ liệu gốc của NodeJS vì Middleware của NestJS hoạt động ở tầng HTTP gốc
  use(req: IncomingMessage, res: ServerResponse, next: () => void) {
    // 1. Lấy Thông tin Request cơ bản
    const method = req.method || 'GET';
    const path = (req as any).originalUrl || req.url || '/';

    // 2. Lấy Request ID từ Header hoặc tự sinh mới
    const requestId = (req.headers['x-request-id'] as string) || uuidv7();

    // 3. Lấy IP từ Request
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

    // Ghi log raw bằng mũi tên như bạn đã chuẩn bị ở các câu hỏi trước
    this.logger.log(`==> Incoming request [Ip: ${ip} | ReqId: ${requestId} | Method: ${method} | Path: ${path}]`);

    // 3. Lưu thông tin vào Context Store
    const store = {
      ip,
      requestId,
      method,
      path,
      startTime: performance.now().toString(),
    };

    // 4. Gắn ngược requestId vào Header phản hồi
    res.setHeader('x-request-id', requestId);

    // Chạy các bước tiếp theo bên trong không gian lưu trữ này
    alsContext.run(store, () => {
      next();
    });
  }
}
