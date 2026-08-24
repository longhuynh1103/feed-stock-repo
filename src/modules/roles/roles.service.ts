import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BaseCrudService } from '@/common/base/base-crud.service';
import { CreateRoleDto } from '@/generated/dto/create-role.dto';
import { UpdateRoleDto } from '@/generated/dto/update-role.dto';
import { Role } from '@prisma/client';

// CRUD mặc định của BaseCrudService dùng luôn, không cần viết lại
// Muốn tùy chỉnh: override method tương ứng hoặc các hook nhỏ (getListWhere, transformCreateData...)
@Injectable()
export class RolesService extends BaseCrudService<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'role');
  }
}
