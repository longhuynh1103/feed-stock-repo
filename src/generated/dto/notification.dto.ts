
import {NotificationStatus,NotificationType,Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class NotificationDto {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt: Date ;
@ApiProperty({
  enum: NotificationType,
  enumName: 'NotificationType',
})
type: NotificationType ;
@ApiProperty({
  maxLength: 100,
  type: 'string',
})
title: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
body: string  | null;
@ApiProperty({
  type: () => Object,
  nullable: true,
})
payload: Prisma.JsonValue  | null;
@ApiProperty({
  enum: NotificationStatus,
  enumName: 'NotificationStatus',
})
status: NotificationStatus ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
readAt: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
resolvedAt: Date  | null;
}
