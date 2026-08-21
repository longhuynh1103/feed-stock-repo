
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsNotEmpty,IsOptional,IsString,IsUUID} from 'class-validator'




export class CreateProductWarehouseDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@IsUUID()
productId: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@IsUUID()
warehouseId: string ;
@ApiProperty({
  type: 'boolean',
  default: false,
  required: false,
})
@IsOptional()
@IsBoolean()
allowNegativeStock?: boolean ;
}
