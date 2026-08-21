
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsOptional,IsString,IsUUID} from 'class-validator'




export class UpdateProductWarehouseDto {
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
  required: false,
})
@IsOptional()
@IsString()
@IsUUID()
warehouseId?: string ;
@ApiProperty({
  type: 'boolean',
  default: false,
  required: false,
})
@IsOptional()
@IsBoolean()
allowNegativeStock?: boolean ;
}
