// import { log } from "../../../shared/logger/logger";
// import { emitStripeAccountStatusUpdated } from "../../../infrastructure/socket/events/event.handlers";

// export class StripeAccountStatusUpdatedUseCase {
//   constructor() {}

//   async execute(input: StripeAccountStatusUpdatedEventInput): Promise<void> {
//     try {
//       emitStripeAccountStatusUpdated(input);
//     } catch (error) {
//       log.error("StripeAccountStatusUpdatedUseCase failed : ", { error });
//       throw error;
//     }
//   }
// }
