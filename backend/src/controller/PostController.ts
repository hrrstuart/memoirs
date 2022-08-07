import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { Post } from "../entity/interactions/post/Post"

export class PostController {

    private postController = getRepository(Post)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.postController.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.postController.findOne(request.params.id)
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.postController.save(request.body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let postToRemove = await this.postController.findOneBy({ post_id: request.params.id })
        await this.postController.remove(postToRemove)
    }

}