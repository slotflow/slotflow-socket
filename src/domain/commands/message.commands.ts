export interface CreateMessageProps {
    senderId: string;
    receiverId: string;
    text: string;
    image?: string;
}

export interface UpdateMessageProps {
    text?: string;
    image?: string;
}
