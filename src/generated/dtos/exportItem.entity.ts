
import {Prisma} from '@prisma/client'
import {ExportOrder} from './exportOrder.entity'
import {Product} from './product.entity'


export class ExportItem {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
exportOrderId: string ;
productId: string ;
productName: string  | null;
baseWeightKg: Prisma.Decimal ;
quantity: Prisma.Decimal ;
pricePerUnit: bigint ;
discountUnit: bigint ;
discountAmount: bigint ;
finalPrice: bigint ;
lineTotal: bigint ;
order?: ExportOrder ;
product?: Product ;
}
