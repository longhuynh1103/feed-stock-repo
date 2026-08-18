
import {Prisma} from '@prisma/client'
import {ExportItem} from './exportItem.entity'
import {ImportItem} from './importItem.entity'
import {ProductWarehouse} from './productWarehouse.entity'
import {Inventory} from './inventory.entity'
import {InventoryTransaction} from './inventoryTransaction.entity'
import {CustomerProductPrice} from './customerProductPrice.entity'


export class Product {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
deletedAt: Date  | null;
name: string ;
category: string  | null;
sku: string ;
baseWeightKg: Prisma.Decimal ;
basePriceBag: bigint ;
baseDiscPriceKg: bigint ;
avgImportPrice: bigint ;
isActive: boolean ;
exportItems?: ExportItem[] ;
importItems?: ImportItem[] ;
productWarehouses?: ProductWarehouse[] ;
inventories?: Inventory[] ;
inventoryTxns?: InventoryTransaction[] ;
customerPrices?: CustomerProductPrice[] ;
}
