
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class InventoryDto {
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
  type: 'string',
  format: 'Decimal.js',
})
currentQuantity: Prisma.Decimal ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
reservedQuantity: Prisma.Decimal ;
}
