
import {ApiProperty} from '@nestjs/swagger'


export class FcmDeviceTokenDto {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt: Date ;
@ApiProperty({
  type: 'string',
})
deviceToken: string ;
@ApiProperty({
  type: 'string',
})
platform: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
lastUsedAt: Date  | null;
}
