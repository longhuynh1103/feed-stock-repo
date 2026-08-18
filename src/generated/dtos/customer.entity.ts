
import {DebtAccount} from './debtAccount.entity'
import {CustomerProductPrice} from './customerProductPrice.entity'
import {ExportOrder} from './exportOrder.entity'


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
