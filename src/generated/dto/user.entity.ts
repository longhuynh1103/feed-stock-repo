
import {ApiProperty} from '@nestjs/swagger'
import {UserRole} from './userRole.entity'
import {FcmDeviceToken} from './fcmDeviceToken.entity'
import {RefreshToken} from './refreshToken.entity'
import {DebtPayment} from './debtPayment.entity'
import {ExportOrder} from './exportOrder.entity'
import {ImportOrder} from './importOrder.entity'
import {InventoryTransaction} from './inventoryTransaction.entity'
import {Notification} from './notification.entity'


export class User {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
deletedAt: Date  | null;
@ApiProperty({
  minLength: 3,
  maxLength: 50,
  example: 'nhanvien01',
  type: 'string',
})
username: string ;
@ApiProperty({
  maxLength: 100,
  type: 'string',
})
fullName: string ;
@ApiProperty({
  maxLength: 15,
  type: 'string',
  nullable: true,
})
phone: string  | null;
@ApiProperty({
  type: 'boolean',
})
isActive: boolean ;
@ApiProperty({
  type: () => UserRole,
  isArray: true,
  required: false,
})
roles?: UserRole[] ;
@ApiProperty({
  type: () => FcmDeviceToken,
  isArray: true,
  required: false,
})
fcmDeviceTokens?: FcmDeviceToken[] ;
@ApiProperty({
  type: () => RefreshToken,
  isArray: true,
  required: false,
})
refreshTokens?: RefreshToken[] ;
@ApiProperty({
  type: () => DebtPayment,
  isArray: true,
  required: false,
})
debtPayments?: DebtPayment[] ;
@ApiProperty({
  type: () => ExportOrder,
  isArray: true,
  required: false,
})
exportOrders?: ExportOrder[] ;
@ApiProperty({
  type: () => ImportOrder,
  isArray: true,
  required: false,
})
importOrders?: ImportOrder[] ;
@ApiProperty({
  type: () => InventoryTransaction,
  isArray: true,
  required: false,
})
inventoryTxns?: InventoryTransaction[] ;
@ApiProperty({
  type: () => Notification,
  isArray: true,
  required: false,
})
notifications?: Notification[] ;
}
