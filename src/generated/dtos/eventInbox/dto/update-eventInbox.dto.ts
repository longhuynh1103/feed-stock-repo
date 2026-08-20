
import {Prisma} from '@prisma/client'




export class UpdateEventInboxDto {
  eventId?: string;
eventType?: string;
payload?: Prisma.InputJsonValue;
processedAt?: Date;
}
