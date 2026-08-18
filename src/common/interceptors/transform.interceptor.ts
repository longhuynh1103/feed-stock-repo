import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { requestStore } from '../middleware/request-id.middleware';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  private readonly logger = new Logger('TransformInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    // Lấy requestId từ kho lưu trữ ngữ cảnh
    const store = requestStore.getStore();
    const requestId = store?.get('requestId');
    const startTimeStr = store?.get('startTime');

    return next.handle().pipe(
      map((data) => {
        let executionTime = '0.00';
        if (startTimeStr) {
          executionTime = (performance.now() - parseFloat(startTimeStr)).toFixed(2);
        }
        // 3. Log thông tin thời gian chạy ra Console/PM2 kèm theo RequestID
        this.logger.log(`[ReqID: ${requestId}] | Method: ${request.method} | URL: ${request.url} | Status: ${statusCode} | +${executionTime}ms`);

        return {
          statusCode,
          message: data?.message || 'Success',
          requestId,
          executionTime: `${executionTime}ms`, // Trả thêm thông tin này về cho Client nếu muốn (Tùy chọn)
          data: data?.data !== undefined ? data.data : data,
        };
      }),
    );
  }
}
