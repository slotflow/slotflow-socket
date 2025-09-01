import { SignedUrlCache } from "../entities/signedUrlCache.entity";

export interface ISignedUrlRepository {

    findOneSignedUrl(key: string): Promise<SignedUrlCache | null>;

    findOneSignedUrlAndUpdate(key: string, signedUrl: string, expiresAt: Date): Promise<SignedUrlCache>;
}