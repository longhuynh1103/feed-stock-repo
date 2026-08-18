
import {User} from './user.entity'


export class FcmDeviceToken {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
userId: string ;
deviceToken: string ;
platform: string ;
lastUsedAt: Date  | null;
user?: User ;
}
