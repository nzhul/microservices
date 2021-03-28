import { Publisher, Subjects, TicketCreatedEvent } from "@nzhul-tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
