import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from '@/generated/dto/create-customer.dto';
import { UpdateCustomerDto } from '@/generated/dto/update-customer.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customers: CustomersService) {}

  @Post()
  async create(@Body() payload: CreateCustomerDto) {
    return await this.customers.create({ payload });
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.customers.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.customers.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return await this.customers.update({ id, payload });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.customers.remove({ id });
  }
}
