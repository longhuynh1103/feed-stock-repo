
import {Prisma} from '@prisma/client'




export class UpdateImportItemDto {
  productName?: string;
baseWeightKg?: Prisma.Decimal;
quantity?: Prisma.Decimal;
pricePerUnit?: bigint;
finalPrice?: bigint;
lineTotal?: bigint;
}
