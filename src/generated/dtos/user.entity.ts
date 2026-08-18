
import {UserRole} from './userRole.entity'
import {FcmDeviceToken} from './fcmDeviceToken.entity'
import {RefreshToken} from './refreshToken.entity'
import {DebtPayment} from './debtPayment.entity'
import {ExportOrder} from './exportOrder.entity'
import {ImportOrder} from './importOrder.entity'
import {InventoryTransaction} from './inventoryTransaction.entity'
import {Notification} from './notification.entity'


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
