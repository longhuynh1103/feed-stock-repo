import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from '@/generated/dtos/create-product.dto';
import { UpdateProductDto } from '@/generated/dtos/update-product.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { alsContext } from '@/common/context/als.context';

@Injectable()
export class ProductsService {
  private readonly logger: Logger;
  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(ProductsService.name);
  }
  async create(data: { payload: CreateProductDto }) {
    const store = alsContext.getStore();
    const { payload } = data;
    const action = this.create.name;
    this.logger.log(`[ReqId: ${store?.requestId} | Action: ${action}]`);
    return await this.prismaService.product.create({ data: payload });
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
