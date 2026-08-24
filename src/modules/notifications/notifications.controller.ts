import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from '@/generated/dto/create-notification.dto';
import { UpdateNotificationDto } from '@/generated/dto/update-notification.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}

  @Post()
  async create(@Body() payload: CreateNotificationDto) {
    return await this.notifications.create({ payload });
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.notifications.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.notifications.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateNotificationDto) {
    return await this.notifications.update({ id, payload });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.notifications.remove({ id });
  }
}
