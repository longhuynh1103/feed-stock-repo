
import {Prisma} from '@prisma/client'
import {Product} from './product.entity'
import {Warehouse} from './warehouse.entity'


export class Inventory {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
productId: string ;
warehouseId: string ;
currentQuantity: Prisma.Decimal ;
reservedQuantity: Prisma.Decimal ;
product?: Product ;
warehouse?: Warehouse ;
}
