
import {ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsNotEmpty,IsOptional,IsString,IsUUID} from 'class-validator'




export class CreateExportOrderDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@IsUUID()
customerId: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@IsUUID()
warehouseId: string ;
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
