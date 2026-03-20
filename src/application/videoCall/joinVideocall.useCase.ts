
interface JoinVideoCallRequest {
  roomId: string;
  userId: string;
}

export class JoinVideoCallUseCase {
  constructor(
   
  ) {}

  async execute(payload: JoinVideoCallRequest) {
    const { roomId, userId } = payload;


    return {
     
    };
  }
}
