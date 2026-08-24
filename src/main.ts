import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyApiReference from '@scalar/fastify-api-reference';
import * as fs from 'fs';
import * as path from 'path';

// Fastify serialize response bằng JSON.stringify nên cần dạy cách convert BigInt (các field giá tiền) sang Number
(BigInt.prototype as unknown as { toJSON(): number }).toJSON = function () {
  return Number(this);
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false, // Tắt logger mặc định của Fastify để dùng Logger NestJS/PM2
    }),
  );
  app.setGlobalPrefix('api');

  const packageJsonPath = path.join(process.cwd(), 'package.json');

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const currentVersion = packageJson.version;

  const config = new DocumentBuilder().setTitle('Feed Stock Application API').setDescription('Hệ thống tài liệu API cho hệ thống Feed Stock').setVersion(currentVersion).addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, config);

  app.getHttpAdapter().get('/api-json', (req, res) => {
    res.status(200).send(document);
  });

  const fastifyInstance = app.getHttpAdapter().getInstance();

  await fastifyInstance.register(fastifyApiReference, {
    routePrefix: '/docs', // Đường dẫn truy cập UI
    configuration: {
      url: '/api-json', // Trỏ về đúng endpoint chứa file cấu trúc JSON ở trên
      theme: 'purple', // Cấu hình màu sắc bạn thích
      layout: 'modern', // Layout hiện đại chuẩn 3 cột
      darkMode: true,
    },
  });

  // app.getHttpAdapter().get('/docs', (req, res) => {
  //   res.type('text/html').send(
  //     apiReference({
  //       spec: { content: document },
  //       theme: 'purple', // Các theme đẹp: 'purple', 'solarized', 'bluePlanet', 'saturn'
  //       darkMode: true, // Mặc định mở giao diện tối siêu ngầu
  //       layout: 'modern',
  //     }),
  //   );
  // });

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
