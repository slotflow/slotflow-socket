export interface MessageProps {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}
