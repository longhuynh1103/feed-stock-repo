
import {Prisma,EventInboxStatus} from '@prisma/client'


export class EventInbox {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
eventId: string ;
eventType: string ;
payload: Prisma.JsonValue  | null;
processedAt: Date ;
status: EventInboxStatus ;
}
