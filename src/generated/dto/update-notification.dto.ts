
import {NotificationType,Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsEnum,IsOptional,IsString,Length} from 'class-validator'




export class UpdateNotificationDto {
  @ApiProperty({
  enum: NotificationType,
  enumName: 'NotificationType',
  required: false,
})
@IsOptional()
@IsEnum(NotificationType)
type?: NotificationType ;
@ApiProperty({
  maxLength: 100,
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@Length(1, 100)
title?: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
body?: string  | null;
@ApiProperty({
  type: () => Object,
  required: false,
  nullable: true,
})
@IsOptional()
payload?: Prisma.InputJsonValue  | Prisma.NullableJsonNullValueInput;
}
