
import {Inventory} from './inventory.entity'
import {ProductWarehouse} from './productWarehouse.entity'
import {ExportOrder} from './exportOrder.entity'
import {ImportOrder} from './importOrder.entity'
import {InventoryTransaction} from './inventoryTransaction.entity'


export class Warehouse {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
deletedAt: Date  | null;
name: string ;
address: string  | null;
isActive: boolean ;
inventories?: Inventory[] ;
productWarehouses?: ProductWarehouse[] ;
exportOrders?: ExportOrder[] ;
importOrders?: ImportOrder[] ;
inventoryTxns?: InventoryTransaction[] ;
}
