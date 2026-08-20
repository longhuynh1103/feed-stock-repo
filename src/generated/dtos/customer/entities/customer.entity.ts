
import {DebtAccount} from '../../debtAccount/entities/debtAccount.entity'
import {CustomerProductPrice} from '../../customerProductPrice/entities/customerProductPrice.entity'
import {ExportOrder} from '../../exportOrder/entities/exportOrder.entity'


export class Customer {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
deletedAt: Date  | null;
name: string ;
phone: string  | null;
address: string  | null;
debtLimit: bigint  | null;
debtAccounts?: DebtAccount[] ;
productPrices?: CustomerProductPrice[] ;
exportOrders?: ExportOrder[] ;
}
