import { BookingRepositoryImpl } from "../infrastructure/database/booking.repository.impl";

interface JoinVideoCallRequest {
  roomId: string;
  userId: string;
}

export class JoinVideoCallUseCase {
  constructor(
    private bookingRepository: BookingRepositoryImpl
  ) {}

  async execute(payload: JoinVideoCallRequest) {
    const { roomId, userId } = payload;

    const booking = await this.bookingRepository.findByRoomId(roomId);
    if (!booking) throw new Error("Video call room not found");

    if (![booking.userId.toString(), booking.serviceProviderId.toString()].includes(userId)) {
      throw new Error("Unauthorized to join this call");
    }

    return {
      roomId: booking.videoCallRoomId,
      appointmentId: booking._id,
      providerId: booking.serviceProviderId,
      userId: booking.userId,
    };
  }
}
