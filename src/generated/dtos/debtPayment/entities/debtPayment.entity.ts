
import {DebtAccount} from '../../debtAccount/entities/debtAccount.entity'
import {User} from '../../user/entities/user.entity'


export class DebtPayment {
  id: string ;
createdAt: Date ;
debtAccountId: string ;
amount: bigint ;
paymentMethod: string  | null;
note: string  | null;
createdById: string  | null;
paidAt: Date ;
debtAccount?: DebtAccount ;
createdBy?: User  | null;
}
