
import {ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsInt,IsNotEmpty,IsOptional,IsPositive,IsString,IsUUID,MaxLength} from 'class-validator'




export class CreateDebtPaymentDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@IsUUID()
debtAccountId: string ;
@ApiProperty({
  minimum: 1,
  type: 'integer',
  format: 'int64',
})
@IsNotEmpty()
@IsInt()
@IsPositive()
amount: bigint ;
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
@ApiProperty({
  type: 'string',
  format: 'date-time',
  default: new Date().toISOString(),
  required: false,
})
@IsOptional()
@IsDateString()
paidAt?: Date ;
}
