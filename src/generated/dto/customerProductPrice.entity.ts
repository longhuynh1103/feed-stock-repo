
import {ApiProperty} from '@nestjs/swagger'
import {Customer} from './customer.entity'
import {Product} from './product.entity'


export class CustomerProductPrice {
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
customerId: string ;
@ApiProperty({
  type: 'string',
})
productId: string ;
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
@ApiProperty({
  type: () => Customer,
  required: false,
})
customer?: Customer ;
@ApiProperty({
  type: () => Product,
  required: false,
})
product?: Product ;
}
