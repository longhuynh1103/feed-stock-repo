
import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,Length,MaxLength} from 'class-validator'




export class CreateWarehouseDto {
  @ApiProperty({
  maxLength: 100,
  type: 'string',
})
@IsNotEmpty()
@IsString()
@Length(2, 100)
name: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(200)
address?: string  | null;
}
