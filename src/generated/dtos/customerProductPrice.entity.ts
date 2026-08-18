
import {Customer} from './customer.entity'
import {Product} from './product.entity'


export class CustomerProductPrice {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
customerId: string ;
productId: string ;
lastExportPrice: bigint ;
lastDiscountUnit: bigint ;
customer?: Customer ;
product?: Product ;
}
