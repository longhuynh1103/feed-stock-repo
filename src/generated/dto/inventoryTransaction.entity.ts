
import {InventoryRefType,Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Product} from './product.entity'
import {Warehouse} from './warehouse.entity'
import {User} from './user.entity'


export class InventoryTransaction {
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
})
productId: string ;
@ApiProperty({
  type: 'string',
})
warehouseId: string ;
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
@ApiProperty({
  type: 'string',
  nullable: true,
})
createdById: string  | null;
@ApiProperty({
  type: () => Product,
  required: false,
})
product?: Product ;
@ApiProperty({
  type: () => Warehouse,
  required: false,
})
warehouse?: Warehouse ;
@ApiProperty({
  type: () => User,
  required: false,
  nullable: true,
})
createdBy?: User  | null;
}
