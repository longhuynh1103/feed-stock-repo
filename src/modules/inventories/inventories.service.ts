import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BaseCrudService } from '@/common/base/base-crud.service';
import { CreateInventoryDto } from '@/generated/dto/create-inventory.dto';
import { UpdateInventoryDto } from '@/generated/dto/update-inventory.dto';
import { Inventory } from '@prisma/client';

// CRUD mặc định của BaseCrudService dùng luôn, không cần viết lại
// Muốn tùy chỉnh: override method tương ứng hoặc các hook nhỏ (getListWhere, transformCreateData...)
@Injectable()
export class InventoriesService extends BaseCrudService<Inventory, CreateInventoryDto, UpdateInventoryDto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'inventory');
  }
}
