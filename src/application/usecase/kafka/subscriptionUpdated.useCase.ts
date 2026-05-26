import { log } from "../../../shared/logger/logger";
import { ProviderSubscriptionUpdatedEventInput } from "../../dtos/kafka.dtos";
import { emitSubscriptionActivated } from "../../../infrastructure/socket/events/event.handlers";

export class ProviderSubscriptionUpdatedUseCase {
    constructor(

    ) { };

    async execute(input: ProviderSubscriptionUpdatedEventInput['socketData']): Promise<void> {
        try {
            emitSubscriptionActivated(input);
        } catch (error) {
            log.error("ProviderSubscriptionUpdatedUseCase failed : ", error as Error);
            throw error;
        }
    }
}