
import {Prisma,InventoryRefType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateInventoryTransactionDto {
  changeAmount: Prisma.Decimal;
@ApiProperty({ enum: InventoryRefType})
refType: InventoryRefType;
refId?: string;
balanceAfter?: Prisma.Decimal;
eventId?: string;
}
