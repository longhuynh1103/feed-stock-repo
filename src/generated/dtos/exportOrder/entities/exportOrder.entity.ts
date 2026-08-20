
import {OrderStatus} from '@prisma/client'
import {Customer} from '../../customer/entities/customer.entity'
import {Warehouse} from '../../warehouse/entities/warehouse.entity'
import {User} from '../../user/entities/user.entity'
import {ExportItem} from '../../exportItem/entities/exportItem.entity'
import {DebtAccount} from '../../debtAccount/entities/debtAccount.entity'
import {Notification} from '../../notification/entities/notification.entity'


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
