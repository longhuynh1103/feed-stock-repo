import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BaseCrudService } from '@/common/base/base-crud.service';
import { CreateNotificationDto } from '@/generated/dto/create-notification.dto';
import { UpdateNotificationDto } from '@/generated/dto/update-notification.dto';
import { Notification } from '@prisma/client';

// CRUD mặc định của BaseCrudService dùng luôn, không cần viết lại
// Muốn tùy chỉnh: override method tương ứng hoặc các hook nhỏ (getListWhere, transformCreateData...)
@Injectable()
export class NotificationsService extends BaseCrudService<Notification, CreateNotificationDto, UpdateNotificationDto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'notification');
  }
}
