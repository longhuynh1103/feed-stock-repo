
import {ApiProperty} from '@nestjs/swagger'
import {DebtAccount} from './debtAccount.entity'
import {ImportOrder} from './importOrder.entity'


export class Supplier {
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
  maxLength: 100,
  type: 'string',
})
name: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
taxCode: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
address: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
phone: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int64',
  nullable: true,
})
debtLimit: bigint  | null;
@ApiProperty({
  type: () => DebtAccount,
  isArray: true,
  required: false,
})
debtAccounts?: DebtAccount[] ;
@ApiProperty({
  type: () => ImportOrder,
  isArray: true,
  required: false,
})
importOrders?: ImportOrder[] ;
}
