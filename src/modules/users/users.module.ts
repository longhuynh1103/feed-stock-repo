import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersListener } from './users.listener';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersListener],
})
export class UsersModule {}
