
import {Prisma} from '@prisma/client'




export class CreateExportItemDto {
  productName?: string;
baseWeightKg: Prisma.Decimal;
quantity: Prisma.Decimal;
pricePerUnit: bigint;
finalPrice: bigint;
lineTotal: bigint;
}
