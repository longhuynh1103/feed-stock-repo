
import {OrderStatus} from '@prisma/client'
import {Supplier} from '../../supplier/entities/supplier.entity'
import {Warehouse} from '../../warehouse/entities/warehouse.entity'
import {User} from '../../user/entities/user.entity'
import {ImportItem} from '../../importItem/entities/importItem.entity'
import {DebtAccount} from '../../debtAccount/entities/debtAccount.entity'
import {Notification} from '../../notification/entities/notification.entity'


export class ImportOrder {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
deletedAt: Date  | null;
code: string ;
supplierId: string ;
warehouseId: string ;
supplierName: string  | null;
warehouseName: string  | null;
status: OrderStatus ;
totalAmount: bigint ;
totalDiscount: bigint ;
netAmount: bigint ;
createdById: string ;
importDate: Date  | null;
completedAt: Date  | null;
cancelledAt: Date  | null;
supplier?: Supplier ;
warehouse?: Warehouse ;
createdBy?: User ;
items?: ImportItem[] ;
debtAccount?: DebtAccount  | null;
linkedNotifications?: Notification[] ;
}
