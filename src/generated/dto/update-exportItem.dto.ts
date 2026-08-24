
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator'
import { Transform } from 'class-transformer';
import { IsFlexibleDecimal } from '@/common/validators/is-flexible-decimal.decorator';




export class UpdateExportItemDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@IsUUID()
productId?: string ;
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
  type: 'string',
  format: 'Decimal.js',
  required: false,
})
@IsOptional()
@Transform(({ value }) => (typeof value === 'string' ? Number(value) : value))
@IsFlexibleDecimal()
@Min(0)
quantity?: Prisma.Decimal ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
  required: false,
})
@IsOptional()
@IsInt()
@Min(0)
pricePerUnit?: bigint ;
}
