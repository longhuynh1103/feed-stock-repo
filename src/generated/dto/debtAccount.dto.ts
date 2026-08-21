
import {DebtStatus,PartyType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class DebtAccountDto {
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
  enum: PartyType,
  enumName: 'PartyType',
})
partyType: PartyType ;
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
}
