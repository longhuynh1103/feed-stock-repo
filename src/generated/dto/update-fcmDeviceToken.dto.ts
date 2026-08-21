
import {ApiProperty} from '@nestjs/swagger'
import {IsIn,IsOptional,IsString} from 'class-validator'




export class UpdateFcmDeviceTokenDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
deviceToken?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@IsIn(['IOS', 'ANDROID', 'WEB'])
platform?: string ;
}
