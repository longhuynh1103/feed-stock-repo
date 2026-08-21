
import {OrderStatus} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Supplier} from './supplier.entity'
import {Warehouse} from './warehouse.entity'
import {User} from './user.entity'
import {ImportItem} from './importItem.entity'
import {DebtAccount} from './debtAccount.entity'
import {Notification} from './notification.entity'


export class ImportOrder {
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
  type: 'string',
})
code: string ;
@ApiProperty({
  type: 'string',
})
supplierId: string ;
@ApiProperty({
  type: 'string',
})
warehouseId: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
supplierName: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
warehouseName: string  | null;
@ApiProperty({
  enum: OrderStatus,
  enumName: 'OrderStatus',
})
status: OrderStatus ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
totalAmount: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
totalDiscount: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
netAmount: bigint ;
@ApiProperty({
  type: 'string',
})
createdById: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
importDate: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
completedAt: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
cancelledAt: Date  | null;
@ApiProperty({
  type: () => Supplier,
  required: false,
})
supplier?: Supplier ;
@ApiProperty({
  type: () => Warehouse,
  required: false,
})
warehouse?: Warehouse ;
@ApiProperty({
  type: () => User,
  required: false,
})
createdBy?: User ;
@ApiProperty({
  type: () => ImportItem,
  isArray: true,
  required: false,
})
items?: ImportItem[] ;
@ApiProperty({
  type: () => DebtAccount,
  required: false,
  nullable: true,
})
debtAccount?: DebtAccount  | null;
@ApiProperty({
  type: () => Notification,
  isArray: true,
  required: false,
})
linkedNotifications?: Notification[] ;
}
