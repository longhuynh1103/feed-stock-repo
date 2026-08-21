
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class ProductDto {
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
  format: 'date-time',
  nullable: true,
})
deletedAt: Date  | null;
@ApiProperty({
  maxLength: 100,
  type: 'string',
})
name: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
category: string  | null;
@ApiProperty({
  type: 'string',
})
sku: string ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
baseWeightKg: Prisma.Decimal ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
basePriceBag: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
baseDiscPriceKg: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
avgImportPrice: bigint ;
@ApiProperty({
  type: 'boolean',
})
isActive: boolean ;
}
