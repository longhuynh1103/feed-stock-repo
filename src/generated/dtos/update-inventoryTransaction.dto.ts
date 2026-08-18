
import {Prisma,InventoryRefType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateInventoryTransactionDto {
  changeAmount?: Prisma.Decimal;
@ApiProperty({ enum: InventoryRefType})
refType?: InventoryRefType;
refId?: string;
balanceAfter?: Prisma.Decimal;
eventId?: string;
}
