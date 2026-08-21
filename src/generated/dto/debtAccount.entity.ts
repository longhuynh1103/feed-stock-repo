
import {DebtStatus,PartyType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {ImportOrder} from './importOrder.entity'
import {ExportOrder} from './exportOrder.entity'
import {Customer} from './customer.entity'
import {Supplier} from './supplier.entity'
import {DebtPayment} from './debtPayment.entity'


export class DebtAccount {
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
  nullable: true,
})
importOrderId: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
exportOrderId: string  | null;
@ApiProperty({
  enum: PartyType,
  enumName: 'PartyType',
})
partyType: PartyType ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
customerId: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
supplierId: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
partyName: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
refCode: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
totalDebt: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
paidAmount: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
remainingAmount: bigint ;
@ApiProperty({
  enum: DebtStatus,
  enumName: 'DebtStatus',
})
status: DebtStatus ;
@ApiProperty({
  type: () => ImportOrder,
  required: false,
  nullable: true,
})
importOrder?: ImportOrder  | null;
@ApiProperty({
  type: () => ExportOrder,
  required: false,
  nullable: true,
})
exportOrder?: ExportOrder  | null;
@ApiProperty({
  type: () => Customer,
  required: false,
  nullable: true,
})
customer?: Customer  | null;
@ApiProperty({
  type: () => Supplier,
  required: false,
  nullable: true,
})
supplier?: Supplier  | null;
@ApiProperty({
  type: () => DebtPayment,
  isArray: true,
  required: false,
})
payments?: DebtPayment[] ;
}
