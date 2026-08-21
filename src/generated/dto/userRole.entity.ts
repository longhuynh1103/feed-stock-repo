
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'
import {Role} from './role.entity'


export class UserRole {
  @ApiProperty({
  type: 'string',
})
userId: string ;
@ApiProperty({
  type: 'string',
})
roleId: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
assignedAt: Date ;
@ApiProperty({
  type: () => User,
  required: false,
})
user?: User ;
@ApiProperty({
  type: () => Role,
  required: false,
})
role?: Role ;
}
