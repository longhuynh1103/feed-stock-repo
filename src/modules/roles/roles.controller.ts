import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from '@/generated/dto/create-role.dto';
import { UpdateRoleDto } from '@/generated/dto/update-role.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly roles: RolesService) {}

  @Post()
  async create(@Body() payload: CreateRoleDto) {
    return await this.roles.create({ payload });
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.roles.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.roles.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateRoleDto) {
    return await this.roles.update({ id, payload });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.roles.remove({ id });
  }
}
