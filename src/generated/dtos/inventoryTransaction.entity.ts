
import {Prisma,InventoryRefType} from '@prisma/client'
import {Product} from './product.entity'
import {Warehouse} from './warehouse.entity'
import {User} from './user.entity'


export class InventoryTransaction {
  id: string ;
createdAt: Date ;
productId: string ;
warehouseId: string ;
changeAmount: Prisma.Decimal ;
refType: InventoryRefType ;
refId: string  | null;
balanceAfter: Prisma.Decimal  | null;
eventId: string  | null;
createdById: string  | null;
product?: Product ;
warehouse?: Warehouse ;
createdBy?: User  | null;
}
