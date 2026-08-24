import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from '@/generated/dto/create-inventory.dto';
import { UpdateInventoryDto } from '@/generated/dto/update-inventory.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventories: InventoriesService) {}

  @Post()
  async create(@Body() payload: CreateInventoryDto) {
    return await this.inventories.create({ payload });
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.inventories.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.inventories.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateInventoryDto) {
    return await this.inventories.update({ id, payload });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.inventories.remove({ id });
  }
}
