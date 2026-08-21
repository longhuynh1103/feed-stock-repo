
import {ApiProperty} from '@nestjs/swagger'
import {IsIn,IsNotEmpty,IsString} from 'class-validator'




export class CreateFcmDeviceTokenDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
deviceToken: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
@IsIn(['IOS', 'ANDROID', 'WEB'])
platform: string ;
}
