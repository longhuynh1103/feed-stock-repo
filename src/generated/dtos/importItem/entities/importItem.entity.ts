
import {Prisma} from '@prisma/client'
import {ImportOrder} from '../../importOrder/entities/importOrder.entity'
import {Product} from '../../product/entities/product.entity'


export class ImportItem {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
importOrderId: string ;
productId: string ;
productName: string  | null;
baseWeightKg: Prisma.Decimal ;
quantity: Prisma.Decimal ;
pricePerUnit: bigint ;
discountUnit: bigint ;
discountAmount: bigint ;
finalPrice: bigint ;
lineTotal: bigint ;
order?: ImportOrder ;
product?: Product ;
}
