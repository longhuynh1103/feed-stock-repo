import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BaseCrudService } from '@/common/base/base-crud.service';
import { CreateImportOrderDto } from '@/generated/dto/create-importOrder.dto';
import { UpdateImportOrderDto } from '@/generated/dto/update-importOrder.dto';
import { ImportOrder } from '@prisma/client';

// CRUD mặc định của BaseCrudService dùng luôn, không cần viết lại
// Muốn tùy chỉnh: override method tương ứng hoặc các hook nhỏ (getListWhere, transformCreateData...)
@Injectable()
export class ImportOrdersService extends BaseCrudService<ImportOrder, CreateImportOrderDto, UpdateImportOrderDto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'importOrder');
  }
}
