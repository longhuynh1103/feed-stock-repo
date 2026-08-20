
import {Customer} from '../../customer/entities/customer.entity'
import {Product} from '../../product/entities/product.entity'


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
