
import {Prisma} from '@prisma/client'
import {ExportItem} from '../../exportItem/entities/exportItem.entity'
import {ImportItem} from '../../importItem/entities/importItem.entity'
import {ProductWarehouse} from '../../productWarehouse/entities/productWarehouse.entity'
import {Inventory} from '../../inventory/entities/inventory.entity'
import {InventoryTransaction} from '../../inventoryTransaction/entities/inventoryTransaction.entity'
import {CustomerProductPrice} from '../../customerProductPrice/entities/customerProductPrice.entity'


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
