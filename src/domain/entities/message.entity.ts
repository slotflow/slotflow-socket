import { Types } from "mongoose";
import { MessageProps } from "../contracts/message.contract";
import { CreateMessageProps, UpdateMessageProps } from "../commands/message.commands";

export class Message {
    private props: MessageProps;

    constructor(props: MessageProps) {
        this.props = props;
    }

    private touch() {
        this.props.updatedAt = new Date();
    }

    static create(props: CreateMessageProps) {
        return new Message({
            _id: "",
            senderId: props.senderId,
            receiverId: props.receiverId,
            text: props.text,
            image: props.image,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    // Getters

    get _id(): string {
        return this.props._id;
    }

    get senderId(): string {
        return this.props.senderId;
    }

    get receiverId(): string {
        return this.props.receiverId;
    }

    get text(): string {
        return this.props.text;
    }

    get image(): string | undefined {
        return this.props.image;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    // Business Methods

    getProps(): Readonly<MessageProps> {
        return { ...this.props };
    }

    update(props: UpdateMessageProps) {
        this.props = {
            ...this.props,
            ...props
        };
        this.touch();
    }
}