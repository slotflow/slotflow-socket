import { log } from "../../shared/logger/logger";
import { ProviderSubscriptionUpdatedEvent } from "../dtos/kafka.dtos";
import { emitSubscriptionActivated } from "../../infrastructure/socket/events/event.handlers";

export class ProviderSubscriptionUpdatedUseCase {
    constructor(

    ) { };

    async execute(payload: ProviderSubscriptionUpdatedEvent): Promise<void> {
        const { providerId } = payload;
        try {
            emitSubscriptionActivated(providerId, payload);
        } catch (error) {
            log.error("ProviderSubscriptionUpdatedUseCase failed : ",error as Error);
            throw error;
        }
    }
}