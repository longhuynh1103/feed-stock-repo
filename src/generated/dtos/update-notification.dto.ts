
import {Prisma,NotificationType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateNotificationDto {
  @ApiProperty({ enum: NotificationType})
type?: NotificationType;
title?: string;
body?: string;
payload?: Prisma.InputJsonValue;
readAt?: Date;
resolvedAt?: Date;
}
