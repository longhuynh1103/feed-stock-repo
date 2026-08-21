
import {ApiProperty} from '@nestjs/swagger'
import {IsInt,IsOptional,IsPositive,IsString,IsUUID,MaxLength} from 'class-validator'




export class UpdateDebtPaymentDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@IsUUID()
debtAccountId?: string ;
@ApiProperty({
  minimum: 1,
  type: 'integer',
  format: 'int64',
  required: false,
})
@IsOptional()
@IsInt()
@IsPositive()
amount?: bigint ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(20)
paymentMethod?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@MaxLength(200)
note?: string  | null;
}
