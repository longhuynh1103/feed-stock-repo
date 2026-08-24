import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BaseCrudService } from '@/common/base/base-crud.service';
import { CreateProductDto } from '@/generated/dto/create-product.dto';
import { UpdateProductDto } from '@/generated/dto/update-product.dto';
import { Product } from '@prisma/client';

// CRUD mặc định của BaseCrudService dùng luôn, không cần viết lại
// Muốn tùy chỉnh: override method tương ứng (ví dụ override getListWhere để filter theo category)
@Injectable()
export class ProductsService extends BaseCrudService<Product, CreateProductDto, UpdateProductDto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'product');
  }
}
