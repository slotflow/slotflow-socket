import { KafkaMessage } from "kafkajs";
import { PlanName } from "../../domain/enums/common.enums";

//// **** KAFKA COMMON DTOS

// kafka client adapter props
export interface KafkaClientAdapterProps {
    topic: string;
    partition: number;
    message: KafkaMessage;
}

// backend-main service subscribing kafka event payload
export interface SSSubKafkaEventPayload {
    socketData: any;
}

// dlq metadata
export interface DqMetaData {
    service: string;
    originalTopic: string;
    error: string;
    failedAt: Date;
    retryCount?: number;
}

// event envelope
export interface EventEnvelope<SSSubKafkaEventPayload, M = DqMetaData> {
    eventId: string;
    occurredAt: string;
    attempt: number;
    maxAttempts: number;
    payload: SSSubKafkaEventPayload;
    metadata?: M;
}

// kafka client adapter message handler
export type MessageHandler = (payload: KafkaClientAdapterProps) => Promise<void>;

// process event wrapper input
export interface ProcessEventWrapperInput {
  topic: string;
  eventData: EventEnvelope<SSSubKafkaEventPayload>;
  businessUseCase: { execute: (data: any) => Promise<void> };
  payloadExtractor: (payload: SSSubKafkaEventPayload) => any;
}



// **** subscribing events

// provider subscription updated event
export interface ProviderSubscriptionUpdatedEventInput {
    socketData: {
        userId: string;
        subscriptionPlan: PlanName;
        startDate: Date;
        endDate: Date;
  }
}

// stripe account status updated event
export interface StripeAccountStatusUpdatedEventInput {
    socketData: {
        userId: string;
        stripeAccountStatus: string;
  }
}