
import {User} from './user.entity'
import {Role} from './role.entity'


export class UserRole {
  userId: string ;
roleId: string ;
assignedAt: Date ;
user?: User ;
role?: Role ;
}
