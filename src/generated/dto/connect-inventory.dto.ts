
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class InventoryProductIdWarehouseIdUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
productId: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
warehouseId: string ;
  }

@ApiExtraModels(InventoryProductIdWarehouseIdUniqueInputDto)
export class ConnectInventoryDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: InventoryProductIdWarehouseIdUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => InventoryProductIdWarehouseIdUniqueInputDto)
productId_warehouseId?: InventoryProductIdWarehouseIdUniqueInputDto ;
}
