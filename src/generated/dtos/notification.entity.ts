
import {Prisma,NotificationType,NotificationStatus} from '@prisma/client'
import {User} from './user.entity'
import {ImportOrder} from './importOrder.entity'
import {ExportOrder} from './exportOrder.entity'


export class Notification {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
userId: string  | null;
type: NotificationType ;
title: string ;
body: string  | null;
payload: Prisma.JsonValue  | null;
status: NotificationStatus ;
linkedImportOrderId: string  | null;
linkedExportOrderId: string  | null;
readAt: Date  | null;
resolvedAt: Date  | null;
user?: User  | null;
linkedImportOrder?: ImportOrder  | null;
linkedExportOrder?: ExportOrder  | null;
}
