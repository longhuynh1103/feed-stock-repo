
import {EventInboxStatus,Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class EventInbox {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt: Date ;
@ApiProperty({
  type: 'string',
})
eventId: string ;
@ApiProperty({
  type: 'string',
})
eventType: string ;
@ApiProperty({
  type: () => Object,
  nullable: true,
})
payload: Prisma.JsonValue  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
processedAt: Date ;
@ApiProperty({
  enum: EventInboxStatus,
  enumName: 'EventInboxStatus',
})
status: EventInboxStatus ;
}
