import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BaseCrudService } from '@/common/base/base-crud.service';
import { CreateWarehouseDto } from '@/generated/dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '@/generated/dto/update-warehouse.dto';
import { Warehouse } from '@prisma/client';

// CRUD mặc định của BaseCrudService dùng luôn, không cần viết lại
// Muốn tùy chỉnh: override method tương ứng hoặc các hook nhỏ (getListWhere, transformCreateData...)
@Injectable()
export class WarehousesService extends BaseCrudService<Warehouse, CreateWarehouseDto, UpdateWarehouseDto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'warehouse');
  }
}
