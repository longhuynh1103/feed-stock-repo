
import {OrderStatus} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class ImportOrderDto {
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
  format: 'date-time',
  nullable: true,
})
deletedAt: Date  | null;
@ApiProperty({
  type: 'string',
})
code: string ;
@ApiProperty({
  type: 'string',
})
supplierId: string ;
@ApiProperty({
  type: 'string',
})
warehouseId: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
supplierName: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
warehouseName: string  | null;
@ApiProperty({
  enum: OrderStatus,
  enumName: 'OrderStatus',
})
status: OrderStatus ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
totalAmount: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
totalDiscount: bigint ;
@ApiProperty({
  type: 'integer',
  format: 'int64',
})
netAmount: bigint ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
importDate: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
completedAt: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
cancelledAt: Date  | null;
}
