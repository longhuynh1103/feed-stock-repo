
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Product} from './product.entity'
import {Warehouse} from './warehouse.entity'


export class Inventory {
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
})
warehouseId: string ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
currentQuantity: Prisma.Decimal ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
reservedQuantity: Prisma.Decimal ;
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
}
