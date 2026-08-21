
import {NotificationStatus,NotificationType,Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'
import {ImportOrder} from './importOrder.entity'
import {ExportOrder} from './exportOrder.entity'


export class Notification {
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
  type: 'string',
  nullable: true,
})
userId: string  | null;
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
  nullable: true,
})
linkedImportOrderId: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
linkedExportOrderId: string  | null;
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
@ApiProperty({
  type: () => User,
  required: false,
  nullable: true,
})
user?: User  | null;
@ApiProperty({
  type: () => ImportOrder,
  required: false,
  nullable: true,
})
linkedImportOrder?: ImportOrder  | null;
@ApiProperty({
  type: () => ExportOrder,
  required: false,
  nullable: true,
})
linkedExportOrder?: ExportOrder  | null;
}
