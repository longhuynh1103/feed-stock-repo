
import {DebtAccount} from '../../debtAccount/entities/debtAccount.entity'
import {ImportOrder} from '../../importOrder/entities/importOrder.entity'


export class Supplier {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
deletedAt: Date  | null;
name: string ;
taxCode: string  | null;
address: string  | null;
phone: string  | null;
debtLimit: bigint  | null;
debtAccounts?: DebtAccount[] ;
importOrders?: ImportOrder[] ;
}
