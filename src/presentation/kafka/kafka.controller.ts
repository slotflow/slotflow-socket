import { kafkaConfig } from "../../config/env";
import { log } from "../../shared/logger/logger";
import { handler, processEventWrapperUseCase } from ".";
import { kafkaConsumer } from "../../infrastructure/messaging";
import { IKafkaConsumerAdapter } from "../../application/interfaces/messaging/IKafkaConsumer.adapter";
import { ProcessEventWrapperUseCase } from "../../application/usecase/kafka/processEventWrapper.useCase";

class KafkaController {
  constructor(
    private readonly kafkaConsumer: IKafkaConsumerAdapter,
    private readonly processEventWrapperUseCase: ProcessEventWrapperUseCase,
  ) {
    this.startListening = this.startListening.bind(this);
  }

  async startListening(): Promise<void> {
    try {
      log.info("start listening kafka controller");

      for (const [key, topic] of Object.entries(kafkaConfig.topics.sub)) {
        const useCase = handler[key as keyof typeof handler];
        if (!useCase) continue;

        await this.kafkaConsumer.subscribe(topic as string, async ({ message }) => {
          if (!message.value) return;
          const eventData = JSON.parse(message.value.toString());
          await this.processEventWrapperUseCase.execute({
            businessUseCase: useCase,
            eventData,
            topic: topic as string,
            payloadExtractor: (payload) => payload.socketData,
          });
        });
      }

      await this.kafkaConsumer.startConsumer();
    } catch (error) {
      log.error("KafkaController startListening failed : ", { error });
    }
  }
}

export const kafkaController = new KafkaController(kafkaConsumer, processEventWrapperUseCase);
