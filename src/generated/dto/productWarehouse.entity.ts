
import {ApiProperty} from '@nestjs/swagger'
import {Product} from './product.entity'
import {Warehouse} from './warehouse.entity'


export class ProductWarehouse {
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
@ApiProperty({
  type: () => Product,
  required: false,
})
product?: Product ;
@ApiProperty({
  type: () => Warehouse,
  required: false,
})
warehouse?: Warehouse ;
}
