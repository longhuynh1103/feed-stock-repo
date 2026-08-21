
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsDecimal,IsInt,IsOptional,IsString,IsUUID,Min} from 'class-validator'




export class UpdateExportItemDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@IsUUID()
productId?: string ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
  required: false,
})
@IsOptional()
@IsDecimal()
@Min(0)
baseWeightKg?: Prisma.Decimal ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
  required: false,
})
@IsOptional()
@IsDecimal()
@Min(0)
quantity?: Prisma.Decimal ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
  required: false,
})
@IsOptional()
@IsInt()
@Min(0)
pricePerUnit?: bigint ;
}
