import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";

@Injectable()
export class FilesService {

    private s3: S3 = new S3({
        region: process.env.AWS_BUCKET_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    })

    constructor() {
    }

    async uploadFile(imageBuffer: Express.Multer.File, filepath: string): Promise<S3.ManagedUpload.SendData> {
        return await this.s3.upload({
            Bucket: process.env.AWS_PUBLIC_BUCKET_KEY,
            Body: imageBuffer.buffer,
            Key: filepath
        }).promise();
    }

    async deleteFile(filename: string) {
        return await this.s3.deleteObject({
            Bucket: process.env.PUBLIC_BUCKET_KEY,
            Key: 'posts/' + filename
        }).promise();
    }

    async getFile(filename: string) {
        return await this.s3.getObject({
            Bucket: process.env.AWS_PUBLIC_BUCKET_KEY,
            Key: 'posts/' + filename
        }).promise();
    }
}