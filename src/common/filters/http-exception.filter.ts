import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { requestStore } from '../middleware/request-id.middleware';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorResponseName = 'Internal Server Error';

    if (exception instanceof HttpException) {
      const resContent: any = exception.getResponse();
      errorResponseName = resContent.error || exception.name;
      message = Array.isArray(resContent.message) ? resContent.message.join(', ') : resContent.message || exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // Lấy thông tin từ kho lưu trữ ngữ cảnh
    const store = requestStore.getStore();
    const requestId = store?.get('requestId');
    const startTimeStr = store?.get('startTime');
    
    // Tính toán thời gian xử lý cho đến khi vấp lỗi
    let executionTime = '0.00';
    if (startTimeStr) {
      executionTime = (performance.now() - parseFloat(startTimeStr)).toFixed(2);
    }

    const errorResponseBody = {
      statusCode: status,
      message,
      error: errorResponseName,
      requestId,
      executionTime: `${executionTime}ms`, // Trả về cho client biết lỗi xảy ra sau bao lâu
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Log chi tiết lỗi kèm theo cả RequestID và số mili-giây xử lý thất bại
    this.logger.error(
      `[ReqID: ${requestId}] | Method: ${request.method} | URL: ${request.url} | Status: ${status} | +${executionTime}ms | Error: ${message}`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(status).send(errorResponseBody); 
  }
}
