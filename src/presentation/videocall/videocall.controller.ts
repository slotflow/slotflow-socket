import { Request, Response } from "express";
import { ApiResponse } from "../../infrastructure/dtos/common.dto";
import { axiosInstance } from "../../infrastructure/lib/axioInstance";
// import { JoinVideoCallUseCase } from "../../application/joinVideoCall.usecase";

class VideoCallController {
    constructor(
        // private joinVideoCallUseCase = new JoinVideoCallUseCase()
    ) {
        this.validateRoom = this.validateRoom.bind(this);
        this.joinCall = this.joinCall.bind(this);
    }

    async validateRoom(req: Request, res: Response) {
        try {
            const { roomId, userId } = req.params;

            const response = await axiosInstance.get<ApiResponse<{ valid: boolean }>>(
                `/bookings/validate-room/${roomId}?userId=${userId}`
            );

            return res.status(200).json(response.data);
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

  async joinCall(req: Request, res: Response) {
    try {
      const { roomId } = req.params;
      const userId = req.user.userOrProviderId;
    //   const data = await this.joinVideoCallUseCase.execute({ roomId, userId });

    //   return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

const videoCallController = new VideoCallController();
export { videoCallController };
