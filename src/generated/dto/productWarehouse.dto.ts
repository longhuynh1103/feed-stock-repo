
import {ApiProperty} from '@nestjs/swagger'


export class ProductWarehouseDto {
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
})
productId: string ;
@ApiProperty({
  type: 'string',
})
warehouseId: string ;
@ApiProperty({
  type: 'boolean',
})
allowNegativeStock: boolean ;
}
