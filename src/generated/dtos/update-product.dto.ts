
import {Prisma} from '@prisma/client'




export class UpdateProductDto {
  deletedAt?: Date;
name?: string;
category?: string;
sku?: string;
baseWeightKg?: Prisma.Decimal;
}
