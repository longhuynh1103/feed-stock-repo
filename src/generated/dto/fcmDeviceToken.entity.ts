
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'


export class FcmDeviceToken {
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
userId: string ;
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
@ApiProperty({
  type: () => User,
  required: false,
})
user?: User ;
}
