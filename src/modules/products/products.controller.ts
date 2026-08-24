import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '@/generated/dto/create-product.dto';
import { UpdateProductDto } from '@/generated/dto/update-product.dto';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() payload: CreateProductDto) {
    return await this.productsService.create({ payload });
  }

  @Get()
  async findAll(@Query() query: { limit?: number; page?: number; orderBy?: keyof Product; orderType?: string }) {
    const { limit = 10, page = 1, orderBy = 'createdAt', orderType = 'desc' } = query;
    return await this.productsService.findAll({ limit, page, orderBy, orderType });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return await this.productsService.update({ id, payload });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove({ id });
  }
}
