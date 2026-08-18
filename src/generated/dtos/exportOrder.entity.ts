
import {OrderStatus} from '@prisma/client'
import {Customer} from './customer.entity'
import {Warehouse} from './warehouse.entity'
import {User} from './user.entity'
import {ExportItem} from './exportItem.entity'
import {DebtAccount} from './debtAccount.entity'
import {Notification} from './notification.entity'


export class ExportOrder {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
deletedAt: Date  | null;
code: string ;
customerId: string ;
warehouseId: string ;
customerName: string  | null;
warehouseName: string  | null;
status: OrderStatus ;
totalAmount: bigint ;
totalDiscount: bigint ;
netAmount: bigint ;
hasShortage: boolean ;
createdById: string ;
exportDate: Date  | null;
completedAt: Date  | null;
cancelledAt: Date  | null;
customer?: Customer ;
warehouse?: Warehouse ;
createdBy?: User ;
items?: ExportItem[] ;
debtAccount?: DebtAccount  | null;
linkedNotifications?: Notification[] ;
}
