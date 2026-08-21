
import {ApiProperty} from '@nestjs/swagger'


export class UserRoleDto {
  @ApiProperty({
  type: 'string',
  format: 'date-time',
})
assignedAt: Date ;
}
