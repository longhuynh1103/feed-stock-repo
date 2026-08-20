
import {UserRole} from '../../userRole/entities/userRole.entity'
import {FcmDeviceToken} from '../../fcmDeviceToken/entities/fcmDeviceToken.entity'
import {RefreshToken} from '../../refreshToken/entities/refreshToken.entity'
import {DebtPayment} from '../../debtPayment/entities/debtPayment.entity'
import {ExportOrder} from '../../exportOrder/entities/exportOrder.entity'
import {ImportOrder} from '../../importOrder/entities/importOrder.entity'
import {InventoryTransaction} from '../../inventoryTransaction/entities/inventoryTransaction.entity'
import {Notification} from '../../notification/entities/notification.entity'


export class User {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
deletedAt: Date  | null;
username: string ;
passwordHash: string ;
fullName: string ;
phone: string  | null;
isActive: boolean ;
roles?: UserRole[] ;
fcmDeviceTokens?: FcmDeviceToken[] ;
refreshTokens?: RefreshToken[] ;
debtPayments?: DebtPayment[] ;
exportOrders?: ExportOrder[] ;
importOrders?: ImportOrder[] ;
inventoryTxns?: InventoryTransaction[] ;
notifications?: Notification[] ;
}
