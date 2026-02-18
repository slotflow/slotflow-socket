import { IMessage } from "../models/message.model";
import { Message } from "../../domain/entities/message.entity";

export class MessageMapper {

    static toDomain(doc: IMessage): Message {
        return new Message({
            _id: doc._id.toString(),
            senderId: doc.senderId.toString(),
            receiverId: doc.receiverId.toString(),
            text: doc.text,
            image: doc.image,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        });
    }

    static toPersistence(entity: Message) {
        const props = entity.getProps();

        return {
            _id: props._id,
            senderId: props.senderId,
            receiverId: props.receiverId,
            text: props.text,
            image: props.image,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt
        };
    }
}
