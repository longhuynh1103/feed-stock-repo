
import {ApiProperty} from '@nestjs/swagger'
import {IsInt,IsNotEmpty,IsOptional,IsString,Length,Matches,MaxLength,Min} from 'class-validator'




export class CreateSupplierDto {
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
@Length(10, 20)
taxCode?: string  | null;
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
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@Matches(/^\+?[0-9]{8,15}$/)
phone?: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int64',
  required: false,
  nullable: true,
})
@IsOptional()
@IsInt()
@Min(0)
debtLimit?: bigint  | null;
}
