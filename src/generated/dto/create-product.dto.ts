
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsDecimal,IsInt,IsNotEmpty,IsOptional,IsString,Length,MaxLength,Min} from 'class-validator'




export class CreateProductDto {
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
@MaxLength(50)
category?: string  | null;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@Length(3, 20)
sku: string ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
@IsNotEmpty()
@IsDecimal()
@Min(0)
baseWeightKg: Prisma.Decimal ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
  default: 0,
  required: false,
})
@IsOptional()
@IsInt()
@Min(0)
basePriceBag?: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
  default: 0,
  required: false,
})
@IsOptional()
@IsInt()
@Min(0)
baseDiscPriceKg?: bigint ;
}
