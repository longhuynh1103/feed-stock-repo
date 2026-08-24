import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ImportOrdersService } from './import-orders.service';
import { CreateImportOrderDto } from '@/generated/dto/create-importOrder.dto';
import { UpdateImportOrderDto } from '@/generated/dto/update-importOrder.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Controller('import-orders')
export class ImportOrdersController {
  constructor(private readonly importOrders: ImportOrdersService) {}

  @Post()
  async create(@Body() payload: CreateImportOrderDto) {
    return await this.importOrders.create({ payload });
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.importOrders.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.importOrders.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateImportOrderDto) {
    return await this.importOrders.update({ id, payload });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.importOrders.remove({ id });
  }
}
