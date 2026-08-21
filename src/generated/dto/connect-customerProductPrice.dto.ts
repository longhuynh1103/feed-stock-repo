
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class CustomerProductPriceCustomerIdProductIdUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
customerId: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
productId: string ;
  }

@ApiExtraModels(CustomerProductPriceCustomerIdProductIdUniqueInputDto)
export class ConnectCustomerProductPriceDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: CustomerProductPriceCustomerIdProductIdUniqueInputDto,
  required: false,
})
@IsOptional()
@ValidateNested()
@Type(() => CustomerProductPriceCustomerIdProductIdUniqueInputDto)
customerId_productId?: CustomerProductPriceCustomerIdProductIdUniqueInputDto ;
}
