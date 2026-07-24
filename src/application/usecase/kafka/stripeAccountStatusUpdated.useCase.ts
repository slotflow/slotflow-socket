import { log } from "../../../shared/logger/logger";
import { StripeAccountStatusUpdatedEventInput } from "../../dtos/kafka.dtos";
import { emitStripeAccountStatusUpdated } from "../../../infrastructure/socket/events/event.handlers";

export class StripeAccountStatusUpdatedUseCase {
    constructor() {};

    async execute(input: StripeAccountStatusUpdatedEventInput['socketData']): Promise<void> {
        try {
            emitStripeAccountStatusUpdated(input);
        } catch (error) {
            log.error("StripeAccountStatusUpdatedUseCase failed : ", error as Error);
            throw error;
        }
    }
}