
import {ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsOptional,IsString,IsUUID} from 'class-validator'




export class UpdateExportOrderDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@IsUUID()
customerId?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@IsUUID()
warehouseId?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
@IsOptional()
@IsDateString()
exportDate?: Date  | null;
}
