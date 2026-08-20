
import {PartyType,DebtStatus} from '@prisma/client'
import {ImportOrder} from '../../importOrder/entities/importOrder.entity'
import {ExportOrder} from '../../exportOrder/entities/exportOrder.entity'
import {Customer} from '../../customer/entities/customer.entity'
import {Supplier} from '../../supplier/entities/supplier.entity'
import {DebtPayment} from '../../debtPayment/entities/debtPayment.entity'


export class DebtAccount {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
importOrderId: string  | null;
exportOrderId: string  | null;
partyType: PartyType ;
customerId: string  | null;
supplierId: string  | null;
partyName: string  | null;
refCode: string  | null;
totalDebt: bigint ;
paidAmount: bigint ;
remainingAmount: bigint ;
status: DebtStatus ;
importOrder?: ImportOrder  | null;
exportOrder?: ExportOrder  | null;
customer?: Customer  | null;
supplier?: Supplier  | null;
payments?: DebtPayment[] ;
}
