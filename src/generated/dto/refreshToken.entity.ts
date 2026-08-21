
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'


export class RefreshToken {
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
tokenHash: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
expiresAt: Date ;
@ApiProperty({
  type: 'boolean',
})
revoked: boolean ;
@ApiProperty({
  type: () => User,
  required: false,
})
user?: User ;
}
