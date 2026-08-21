
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,IsUUID,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class ProductWarehouseProductIdWarehouseIdUniqueInputDto {
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
  }

@ApiExtraModels(ProductWarehouseProductIdWarehouseIdUniqueInputDto)
export class ConnectProductWarehouseDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: ProductWarehouseProductIdWarehouseIdUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => ProductWarehouseProductIdWarehouseIdUniqueInputDto)
productId_warehouseId?: ProductWarehouseProductIdWarehouseIdUniqueInputDto ;
}
