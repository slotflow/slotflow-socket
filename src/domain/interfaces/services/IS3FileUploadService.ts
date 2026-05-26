export interface UploadFileOptions {
  folder: string;
  userId: string;
  file: Express.Multer.File;
}

export interface IS3FileUploadService {

    uploadFile(payload: UploadFileOptions): Promise<string>

}