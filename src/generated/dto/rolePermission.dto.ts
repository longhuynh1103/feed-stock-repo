
import {ApiProperty} from '@nestjs/swagger'


export class RolePermissionDto {
  @ApiProperty({
  type: 'string',
  format: 'date-time',
})
assignedAt: Date ;
}
