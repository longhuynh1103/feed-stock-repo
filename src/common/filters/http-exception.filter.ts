import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { alsContext } from '@/common/context/als.context';
import { Prisma } from '@prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    // Lấy thông tin từ kho lưu trữ ngữ cảnh
    const store = alsContext.getStore();
    const requestId = store?.requestId;
    const startTimeStr = store?.startTime;

    this.logger.error(`[${requestId}] Exception ==>\n ${exception} \n<==`);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const { status, error } = this.transformException(exception, requestId as string);

    // // Tính toán thời gian xử lý cho đến khi vấp lỗi
    let executionTime = '0.00';
    if (startTimeStr) {
      executionTime = (performance.now() - parseFloat(startTimeStr)).toFixed(2);
    }

    const respBody = {
      statusCode: status,
      error,
      requestId,
      executionTime: `${executionTime}ms`, // Trả về cho client biết lỗi xảy ra sau bao lâu
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // // Log chi tiết lỗi kèm theo cả RequestID và số mili-giây xử lý thất bại
    this.logger.warn(`<== Completed request [ReqId: ${requestId} | Method: ${request.method} | Path: ${request.url} | Status: ${status} | +${executionTime}ms]`);

    response.status(status).send(respBody);
  }

  transformException(exception: any, requestId: string): Record<string, any> {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const respContent: any = exception.getResponse();
      if (typeof respContent === 'object') {
        error = {
          code: respContent.error || 'BAD_REQUEST',
          message: respContent.message || 'Validation failed',
        };
      } else {
        error = { code: 'HTTP_ERROR', message: respContent };
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002': // Duplicate
          status = HttpStatus.CONFLICT;
          error = {
            code: 'DATA_CONFLICT',
            message: `Dữ liệu bị trùng lặp thuộc tính duy nhất: ${exception.meta?.target || ''}`,
          };
          break;
        case 'P2025': // Not found
          status = HttpStatus.NOT_FOUND;
          error = {
            code: 'RECORD_NOT_FOUND',
            message: 'Không tìm thấy dữ liệu yêu cầu trong cơ sở dữ liệu.',
          };
          break;
        default:
          status = HttpStatus.BAD_REQUEST;
          error = {
            code: exception.code,
            message: 'Yêu cầu xử lý dữ liệu không hợp lệ.',
          };
          break;
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      error = {
        code: 'VALIDATION_ERROR',
        message: 'Dữ liệu không đúng định dạng.',
      };
    } else {
      // In đầy đủ stack trace ra terminal để bạn debug lỗi lập trình
      this.logger.error(`[${requestId}] Unknown error ===>\n ${exception?.stack || exception} \n<===`);
    }
    return { status, error };
  }
}
