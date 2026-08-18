
import {User} from './user.entity'


export class RefreshToken {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
userId: string ;
tokenHash: string ;
expiresAt: Date ;
revoked: boolean ;
user?: User ;
}
