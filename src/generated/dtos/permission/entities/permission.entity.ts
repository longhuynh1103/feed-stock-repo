
import {RolePermission} from '../../rolePermission/entities/rolePermission.entity'


export class Permission {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
deletedAt: Date  | null;
code: string ;
roles?: RolePermission[] ;
}
