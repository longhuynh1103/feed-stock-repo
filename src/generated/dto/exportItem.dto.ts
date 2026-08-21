
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class ExportItemDto {
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
})
productId: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
productName: string  | null;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
baseWeightKg: Prisma.Decimal ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
quantity: Prisma.Decimal ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
pricePerUnit: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
discountUnit: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
discountAmount: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
finalPrice: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
lineTotal: bigint ;
}
