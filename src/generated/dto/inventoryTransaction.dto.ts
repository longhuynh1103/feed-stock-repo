
import {InventoryRefType,Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class InventoryTransactionDto {
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
  format: 'Decimal.js',
})
changeAmount: Prisma.Decimal ;
@ApiProperty({
  enum: InventoryRefType,
  enumName: 'InventoryRefType',
})
refType: InventoryRefType ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
refId: string  | null;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
  nullable: true,
})
balanceAfter: Prisma.Decimal  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
eventId: string  | null;
}
