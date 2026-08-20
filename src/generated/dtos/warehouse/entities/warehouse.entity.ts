
import {Inventory} from '../../inventory/entities/inventory.entity'
import {ProductWarehouse} from '../../productWarehouse/entities/productWarehouse.entity'
import {ExportOrder} from '../../exportOrder/entities/exportOrder.entity'
import {ImportOrder} from '../../importOrder/entities/importOrder.entity'
import {InventoryTransaction} from '../../inventoryTransaction/entities/inventoryTransaction.entity'


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
