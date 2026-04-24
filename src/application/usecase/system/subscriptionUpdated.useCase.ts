import { log } from "../../../shared/logger/logger";
import { EventEnvelope, ProviderSubscriptionUpdatedEvent } from "../../dtos/kafka.dtos";
import { emitSubscriptionActivated } from "../../../infrastructure/socket/events/event.handlers";

export class ProviderSubscriptionUpdatedUseCase {
    constructor(

    ) { };

    async execute(payload: EventEnvelope<ProviderSubscriptionUpdatedEvent>): Promise<void> {
        const {
            payload: { ssData: { providerId } }
        } = payload;
        try {
            emitSubscriptionActivated(providerId, payload.payload.ssData);
        } catch (error) {
            log.error("ProviderSubscriptionUpdatedUseCase failed : ", error as Error);
            throw error;
        }
    }
}