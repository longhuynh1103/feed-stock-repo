
import {ApiProperty} from '@nestjs/swagger'
import {DebtAccount} from './debtAccount.entity'
import {CustomerProductPrice} from './customerProductPrice.entity'
import {ExportOrder} from './exportOrder.entity'


export class Customer {
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
phone: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
address: string  | null;
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
  type: () => CustomerProductPrice,
  isArray: true,
  required: false,
})
productPrices?: CustomerProductPrice[] ;
@ApiProperty({
  type: () => ExportOrder,
  isArray: true,
  required: false,
})
exportOrders?: ExportOrder[] ;
}
