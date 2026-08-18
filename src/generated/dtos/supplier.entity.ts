
import {DebtAccount} from './debtAccount.entity'
import {ImportOrder} from './importOrder.entity'


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
