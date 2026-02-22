import { KafkaMessage } from "kafkajs";
import { PlanName } from "../../domain/enums/common.enums";

// kafka client adapter props
export interface KafkaClientAdapterProps {
    topic: string;
    partition: number;
    message: KafkaMessage;
}

// event envelope
export interface EventEnvelope<T> {
    eventId: string;
    occurredAt: string;
    attempt: number;
    maxAttempts: number;
    payload: T;
}

// kafka client adapter message handler
export type MessageHandler = (payload: KafkaClientAdapterProps) => Promise<void>;


export interface ProviderSubscriptionUpdatedEvent {
    ssData: {
        providerId: string;
        subscriptionPlan: PlanName;
        startDate: Date;
        endDate: Date;
  }
}