
import {ApiProperty} from '@nestjs/swagger'
import {DebtAccount} from './debtAccount.entity'
import {User} from './user.entity'


export class DebtPayment {
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
})
debtAccountId: string ;
@ApiProperty({
  minimum: 1,
  type: 'integer',
  format: 'int64',
})
amount: bigint ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
paymentMethod: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
note: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
createdById: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
paidAt: Date ;
@ApiProperty({
  type: () => DebtAccount,
  required: false,
})
debtAccount?: DebtAccount ;
@ApiProperty({
  type: () => User,
  required: false,
  nullable: true,
})
createdBy?: User  | null;
}
