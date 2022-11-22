import { Injectable } from "@nestjs/common";
import { FilesService } from "./file.service";

@Injectable()
export class UploadService {
    constructor(
        private readonly filesService: FilesService
    ) {}

    async addPost(imageBuffer: Express.Multer.File, filename: string) {
        return this.filesService.uploadFile(imageBuffer, filename);
    }

    async deletePost(filename: string) {
        return this.filesService.deleteFile(filename);
    }

    async getPost(filename: string) {
        return this.filesService.getFile(filename);
    }
}