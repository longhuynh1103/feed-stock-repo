
import {PartyType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateDebtAccountDto {
  @ApiProperty({ enum: PartyType})
partyType: PartyType;
partyName?: string;
refCode?: string;
totalDebt: bigint;
remainingAmount: bigint;
}
