import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post()
  async create(@Body() payload: CreateUserRequestDto) {
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
  async update(@Param('id') id: string, @Body() payload: UpdateUserRequestDto) {
    return await this.users.update({ id, payload });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.users.remove({ id });
  }
}
