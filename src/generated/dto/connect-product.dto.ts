
import {ApiProperty} from '@nestjs/swagger'
import {IsOptional,IsString,Length} from 'class-validator'




export class ConnectProductDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@Length(3, 20)
sku?: string ;
}
