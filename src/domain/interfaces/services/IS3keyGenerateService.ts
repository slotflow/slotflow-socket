export interface GenerateS3KeyPayload { 
    folder: string, 
    userId: string, 
    originalname: string
}

export interface IS3keyGenerateService {

    generateS3Key(payload: GenerateS3KeyPayload): string;

}