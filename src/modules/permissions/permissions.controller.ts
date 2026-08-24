import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from '@/generated/dto/create-permission.dto';
import { UpdatePermissionDto } from '@/generated/dto/update-permission.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissions: PermissionsService) {}

  @Post()
  async create(@Body() payload: CreatePermissionDto) {
    return await this.permissions.create({ payload });
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.permissions.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissions.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdatePermissionDto) {
    return await this.permissions.update({ id, payload });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.permissions.remove({ id });
  }
}
