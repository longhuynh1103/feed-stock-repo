
import {ApiProperty} from '@nestjs/swagger'


export class CustomerProductPriceDto {
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
  type: 'integer',
  format: 'int64',
})
lastExportPrice: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
lastDiscountUnit: bigint ;
}
