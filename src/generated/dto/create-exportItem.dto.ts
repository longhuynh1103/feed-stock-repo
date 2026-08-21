
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsDecimal,IsInt,IsNotEmpty,IsString,IsUUID,Min} from 'class-validator'




export class CreateExportItemDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@IsUUID()
productId: string ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
@IsNotEmpty()
@IsDecimal()
@Min(0)
baseWeightKg: Prisma.Decimal ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
@IsNotEmpty()
@IsDecimal()
@Min(0)
quantity: Prisma.Decimal ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
@IsNotEmpty()
@IsInt()
@Min(0)
pricePerUnit: bigint ;
}
