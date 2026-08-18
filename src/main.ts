import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false, // Tắt logger mặc định của Fastify để dùng Logger NestJS/PM2
    }),
  );

  // Bật tính năng tự động kiểm tra dữ liệu DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động xóa bỏ các thuộc tính không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu client gửi lên thuộc tính lạ
      transform: true, // Tự động chuyển đổi kiểu dữ liệu (vd: string thành number)
    }),
  );

  // Xử lý Response tập trung toàn cục
  app.useGlobalInterceptors(new TransformInterceptor());

  // Kích hoạt Xử lý Lỗi tập trung toàn cục
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
