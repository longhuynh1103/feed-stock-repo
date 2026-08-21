
import {NotificationType,Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsEnum,IsNotEmpty,IsOptional,IsString,Length} from 'class-validator'




export class CreateNotificationDto {
  @ApiProperty({
  enum: NotificationType,
  enumName: 'NotificationType',
})
@IsNotEmpty()
@IsEnum(NotificationType)
type: NotificationType ;
@ApiProperty({
  maxLength: 100,
  type: 'string',
})
@IsNotEmpty()
@IsString()
@Length(1, 100)
title: string ;
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
