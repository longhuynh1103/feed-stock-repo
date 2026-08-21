
import {ApiProperty} from '@nestjs/swagger'
import {Inventory} from './inventory.entity'
import {ProductWarehouse} from './productWarehouse.entity'
import {ExportOrder} from './exportOrder.entity'
import {ImportOrder} from './importOrder.entity'
import {InventoryTransaction} from './inventoryTransaction.entity'


export class Warehouse {
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
address: string  | null;
@ApiProperty({
  type: 'boolean',
})
isActive: boolean ;
@ApiProperty({
  type: () => Inventory,
  isArray: true,
  required: false,
})
inventories?: Inventory[] ;
@ApiProperty({
  type: () => ProductWarehouse,
  isArray: true,
  required: false,
})
productWarehouses?: ProductWarehouse[] ;
@ApiProperty({
  type: () => ExportOrder,
  isArray: true,
  required: false,
})
exportOrders?: ExportOrder[] ;
@ApiProperty({
  type: () => ImportOrder,
  isArray: true,
  required: false,
})
importOrders?: ImportOrder[] ;
@ApiProperty({
  type: () => InventoryTransaction,
  isArray: true,
  required: false,
})
inventoryTxns?: InventoryTransaction[] ;
}
