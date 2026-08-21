
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {ExportItem} from './exportItem.entity'
import {ImportItem} from './importItem.entity'
import {ProductWarehouse} from './productWarehouse.entity'
import {Inventory} from './inventory.entity'
import {InventoryTransaction} from './inventoryTransaction.entity'
import {CustomerProductPrice} from './customerProductPrice.entity'


export class Product {
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
@ApiProperty({
  type: () => ExportItem,
  isArray: true,
  required: false,
})
exportItems?: ExportItem[] ;
@ApiProperty({
  type: () => ImportItem,
  isArray: true,
  required: false,
})
importItems?: ImportItem[] ;
@ApiProperty({
  type: () => ProductWarehouse,
  isArray: true,
  required: false,
})
productWarehouses?: ProductWarehouse[] ;
@ApiProperty({
  type: () => Inventory,
  isArray: true,
  required: false,
})
inventories?: Inventory[] ;
@ApiProperty({
  type: () => InventoryTransaction,
  isArray: true,
  required: false,
})
inventoryTxns?: InventoryTransaction[] ;
@ApiProperty({
  type: () => CustomerProductPrice,
  isArray: true,
  required: false,
})
customerPrices?: CustomerProductPrice[] ;
}
