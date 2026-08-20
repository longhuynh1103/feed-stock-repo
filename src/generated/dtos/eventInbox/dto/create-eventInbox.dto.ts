
import {Prisma} from '@prisma/client'




export class CreateEventInboxDto {
  eventId: string;
eventType: string;
payload?: Prisma.InputJsonValue;
processedAt: Date;
}
