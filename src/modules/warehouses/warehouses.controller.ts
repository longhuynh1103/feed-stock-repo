import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from '@/generated/dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '@/generated/dto/update-warehouse.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehouses: WarehousesService) {}

  @Post()
  async create(@Body() payload: CreateWarehouseDto) {
    return await this.warehouses.create({ payload });
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.warehouses.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.warehouses.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateWarehouseDto) {
    return await this.warehouses.update({ id, payload });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.warehouses.remove({ id });
  }
}
