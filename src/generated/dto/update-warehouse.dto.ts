
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsOptional,IsString,Length,MaxLength} from 'class-validator'




export class UpdateWarehouseDto {
  @ApiProperty({
  maxLength: 100,
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@Length(2, 100)
name?: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(200)
address?: string  | null;
@ApiProperty({
  type: 'boolean',
  default: true,
  required: false,
})
@IsOptional()
@IsBoolean()
isActive?: boolean ;
}
