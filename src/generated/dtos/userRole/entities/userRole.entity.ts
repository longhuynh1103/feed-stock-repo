
import {User} from '../../user/entities/user.entity'
import {Role} from '../../role/entities/role.entity'


export class UserRole {
  userId: string ;
roleId: string ;
assignedAt: Date ;
user?: User ;
role?: Role ;
}
