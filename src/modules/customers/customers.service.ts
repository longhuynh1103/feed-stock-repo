import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BaseCrudService } from '@/common/base/base-crud.service';
import { CreateCustomerDto } from '@/generated/dto/create-customer.dto';
import { UpdateCustomerDto } from '@/generated/dto/update-customer.dto';
import { Customer } from '@prisma/client';

// CRUD mặc định của BaseCrudService dùng luôn, không cần viết lại
// Muốn tùy chỉnh: override method tương ứng hoặc các hook nhỏ (getListWhere, transformCreateData...)
@Injectable()
export class CustomersService extends BaseCrudService<Customer, CreateCustomerDto, UpdateCustomerDto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'customer');
  }
}
