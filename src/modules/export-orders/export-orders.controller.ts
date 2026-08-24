import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ExportOrdersService } from './export-orders.service';
import { CreateExportOrderDto } from '@/generated/dto/create-exportOrder.dto';
import { UpdateExportOrderDto } from '@/generated/dto/update-exportOrder.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Controller('export-orders')
export class ExportOrdersController {
  constructor(private readonly exportOrders: ExportOrdersService) {}

  @Post()
  async create(@Body() payload: CreateExportOrderDto) {
    return await this.exportOrders.create({ payload });
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.exportOrders.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.exportOrders.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateExportOrderDto) {
    return await this.exportOrders.update({ id, payload });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.exportOrders.remove({ id });
  }
}
