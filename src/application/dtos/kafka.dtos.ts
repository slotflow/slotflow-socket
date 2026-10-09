import { KafkaMessage } from "kafkajs";
import { PlanName } from "../../domain/enums/common.enums";

/**
 * Kafka common dtos
 */

// kafka client adapter props
export interface KafkaClientAdapterProps {
  topic: string;
  partition: number;
  message: KafkaMessage;
}

// backend-main service subscribing kafka event payload
export interface SSSubKafkaEventPayload<TSocketData = Record<string, string | number>> {
  socketData: TSocketData;
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
export interface EventEnvelope<TPayload, M = DqMetaData> {
  eventId: string;
  occurredAt: string;
  attempt: number;
  maxAttempts: number;
  payload: TPayload;
  metadata?: M;
}

// kafka client adapter message handler
export type MessageHandler = (payload: KafkaClientAdapterProps) => Promise<void>;

// process event wrapper input
export interface ProcessEventWrapperInput<TPayloadData> {
  topic: string;
  eventData: EventEnvelope<SSSubKafkaEventPayload<TPayloadData>>;
  businessUseCase: { execute: (data: TPayloadData) => Promise<void> };
  payloadExtractor: (payload: SSSubKafkaEventPayload<TPayloadData>) => TPayloadData;
}

// subscribing events

// provider subscription updated event
export interface ProviderSubscriptionUpdatedEventInput {
  socketData: {
    userId: string;
    subscriptionPlan: PlanName;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    subscriptionStatus: string;
    hasUsedTrial: boolean;
  };
}

// stripe account status updated event
export interface StripeAccountStatusUpdatedEventInput {
  socketData: {
    userId: string;
    stripeAccountStatus: string;
  };
}
