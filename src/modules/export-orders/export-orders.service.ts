import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BaseCrudService } from '@/common/base/base-crud.service';
import { CreateExportOrderDto } from '@/generated/dto/create-exportOrder.dto';
import { UpdateExportOrderDto } from '@/generated/dto/update-exportOrder.dto';
import { ExportOrder } from '@prisma/client';

// CRUD mặc định của BaseCrudService dùng luôn, không cần viết lại
// Muốn tùy chỉnh: override method tương ứng hoặc các hook nhỏ (getListWhere, transformCreateData...)
@Injectable()
export class ExportOrdersService extends BaseCrudService<ExportOrder, CreateExportOrderDto, UpdateExportOrderDto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'exportOrder');
  }
}
