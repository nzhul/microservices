import { Publisher, Subjects, TicketUpdatedEvent } from "@nzhul-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
