import { Request, Response } from "express";
import { DecodedUser } from "../../application/dtos/common.dtos";
// import { JoinVideoCallUseCase } from "../../application/joinVideoCall.usecase";

class VideoCallController {
    constructor(
        // private joinVideoCallUseCase = new JoinVideoCallUseCase()
    ) {
        this.joinCall = this.joinCall.bind(this);
    }

  async joinCall(req: Request, res: Response) {
    try {
      const { roomId } = req.params;
      const userId = req.user as DecodedUser;
    //   const data = await this.joinVideoCallUseCase.execute({ roomId, userId });

    //   return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

const videoCallController = new VideoCallController();
export { videoCallController };
