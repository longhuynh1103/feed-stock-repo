import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BaseCrudService } from '@/common/base/base-crud.service';
import { CreateUserDto } from '@/generated/dto/create-user.dto';
import { UpdateUserDto } from '@/generated/dto/update-user.dto';
import { User } from '@prisma/client';

// CRUD mặc định của BaseCrudService dùng luôn, không cần viết lại
// Muốn tùy chỉnh: override method tương ứng hoặc các hook nhỏ (getListWhere, transformCreateData...)
@Injectable()
export class UsersService extends BaseCrudService<User, CreateUserDto, UpdateUserDto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'user');
  }
}
