import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from "@nzhul-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
