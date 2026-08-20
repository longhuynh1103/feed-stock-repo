import { Prisma } from '@prisma/client';

export class CreateProductDto {
  deletedAt?: Date;
  name: string;
  category?: string;
  sku: string;
  baseWeightKg: Prisma.Decimal;
}
