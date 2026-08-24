import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '@/generated/dto/create-user.dto';
import { UpdateUserDto } from '@/generated/dto/update-user.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post()
  async create(@Body() payload: CreateUserDto) {
    return await this.users.create({ payload });
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.users.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.users.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return await this.users.update({ id, payload });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.users.remove({ id });
  }
}
