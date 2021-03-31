import { OrderCreatedEvent, Publisher, Subjects } from "@nzhul-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
