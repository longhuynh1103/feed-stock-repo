import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { alsContext } from '@/common/context/als.context';
import { CreateProductDto } from '@/generated/dto/create-product.dto';
import { UpdateProductDto } from '@/generated/dto/update-product.dto';
import { Prisma } from '@prisma/client';

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

  async findAll(data: { limit: number, page: number, orderBy?: string, orderType?: string }) {
    const store = alsContext.getStore();
    const action = this.findAll.name;
    this.logger.log(`[ReqId: ${store?.requestId} | Action: ${action}]`);
    const { limit, page, orderBy, orderType } = data;
    const skip = (page - 1) * limit;
    const order = orderBy
      ? { [orderBy]: orderType as Prisma.SortOrder }
      : { createdAt: Prisma.SortOrder.desc }
    return await this.prismaService.product.findMany({
      take: limit,
      skip,
      orderBy: order
    })
  }

  async findOne(data: { id: string }) {
    const store = alsContext.getStore();
    const { id } = data;
    const action = this.findOne.name;
    this.logger.log(`[ReqId: ${store?.requestId} | Action: ${action}]`);
    return await this.prismaService.product.findUniqueOrThrow({ where: { id } })
  }

  async update(data: { id: string, payload: UpdateProductDto }) {
    const store = alsContext.getStore();
    const { id, payload } = data;
    const action = this.update.name;
    this.logger.log(`[ReqId: ${store?.requestId} | Action: ${action}]`);
    return await this.prismaService.product.update({ where: { id }, data: payload })
  }

  async remove(data: { id: string }) {
    const store = alsContext.getStore();
    const { id } = data;
    const action = this.remove.name;
    this.logger.log(`[ReqId: ${store?.requestId} | Action: ${action}]`);
    return await this.prismaService.product.delete({ where: { id } })
  }
}
