import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { CustomersModule } from './modules/customers/customers.module';
import { WarehousesModule } from './modules/warehouses/warehouses.module';
import { ImportOrdersModule } from './modules/import-orders/import-orders.module';
import { ExportOrdersModule } from './modules/export-orders/export-orders.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { InventoriesModule } from './modules/inventories/inventories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Dùng được ở mọi module mà không cần import lại
    }),
    PrismaModule,
    ProductsModule,
    UsersModule,
    CustomersModule,
    WarehousesModule,
    ImportOrdersModule,
    ExportOrdersModule,
    RolesModule,
    PermissionsModule,
    NotificationsModule,
    InventoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*'); // Áp dụng cho mọi route của ứng dụng
  }
}
