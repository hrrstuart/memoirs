import { Injectable } from "@nestjs/common";
import { FilesService } from "./file.service";

@Injectable()
export class UploadService {
    constructor(
        private readonly filesService: FilesService
    ) {}

    async uploadFile(imageBuffer: Express.Multer.File, filepath: string) {
        return this.filesService.uploadFile(imageBuffer, filepath);
    }

    async deletePost(filename: string) {
        return this.filesService.deleteFile(filename);
    }

    async getPost(filename: string) {
        return this.filesService.getFile(filename);
    }
}