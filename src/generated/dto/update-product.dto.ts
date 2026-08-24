
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator'
import { Transform } from 'class-transformer';
import { IsFlexibleDecimal } from '@/common/validators/is-flexible-decimal.decorator';




export class UpdateProductDto {
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
@MaxLength(50)
category?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@Length(3, 20)
sku?: string ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
  required: false,
})
@IsOptional()
@Transform(({ value }) => (typeof value === 'string' ? Number(value) : value))
@IsFlexibleDecimal()
@Min(0)
baseWeightKg?: Prisma.Decimal ;
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
@ApiProperty({
  type: 'boolean',
  default: true,
  required: false,
})
@IsOptional()
@IsBoolean()
isActive?: boolean ;
}
