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

// socket service service subscribing kafka event payload
export interface SSSubKafkaEventPayload<
  T extends SSSubKafkaEventPayloadType = SSSubKafkaEventPayloadType,
> {
  socketData: T;
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
export interface ProcessEventWrapperInput<
  T extends SSSubKafkaEventPayloadType = SSSubKafkaEventPayloadType,
> {
  topic: string;
  eventData: EventEnvelope<SSSubKafkaEventPayload<T>>;
  businessUseCase: { execute: (data: T) => Promise<void> };
}

// subscribing events

// provider subscription updated event
export interface ProviderSubscriptionUpdatedEventInput {
  userId: string;
  subscriptionPlan: PlanName;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  subscriptionStatus: string;
  hasUsedTrial: boolean;
}

// stripe account status updated event
// export interface StripeAccountStatusUpdatedEventInput {
//   socketData: {
//     userId: string;
//     stripeAccountStatus: string;
//   };
// }

export type SSSubKafkaEventPayloadType = ProviderSubscriptionUpdatedEventInput;

export type SSSubKafkaEventPayloadMap = {
  planSubscribed: ProviderSubscriptionUpdatedEventInput;
};

export type HandlerMap = {
  [K in keyof SSSubKafkaEventPayloadMap]: {
    execute: (input: SSSubKafkaEventPayloadMap[K]) => Promise<void>;
  };
};
