import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BaseCrudService } from '@/common/base/base-crud.service';
import { CreatePermissionDto } from '@/generated/dto/create-permission.dto';
import { UpdatePermissionDto } from '@/generated/dto/update-permission.dto';
import { Permission } from '@prisma/client';

// CRUD mặc định của BaseCrudService dùng luôn, không cần viết lại
// Muốn tùy chỉnh: override method tương ứng hoặc các hook nhỏ (getListWhere, transformCreateData...)
@Injectable()
export class PermissionsService extends BaseCrudService<Permission, CreatePermissionDto, UpdatePermissionDto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'permission');
  }
}
