import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';

// Tạo kho lưu trữ ngữ cảnh toàn cục cho từng luồng request
export const requestStore = new AsyncLocalStorage<Map<string, string>>();

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const store = new Map<string, string>();

    // Kiểm tra xem Client có gửi sẵn x-request-id lên không (tiện cho Microservices), nếu không thì tự sinh mới
    const requestId = (req.headers['x-request-id'] as string) || randomUUID();

    store.set('requestId', requestId);
    store.set('startTime', performance.now().toString());

    // Gắn ngược requestId vào Header phản hồi để Client tiện đối chiếu khi báo lỗi
    res.setHeader('x-request-id', requestId);

    // Chạy các bước tiếp theo bên trong không gian lưu trữ này
    requestStore.run(store, () => {
      next();
    });
  }
}
