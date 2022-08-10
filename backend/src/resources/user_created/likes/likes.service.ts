import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeInput, ParentType } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { Like } from './like.entity';

@Injectable()
export class LikesService {
  constructor(@InjectRepository(Like) private likesRepository: Repository<Like>) {}

  create(createLikeInput: CreateLikeInput) {
    const newLike = this.likesRepository.create(createLikeInput);

    return this.likesRepository.save(newLike);
  }

  findAll() {
    return this.likesRepository.find();
  }

  findOne(id: string) {
    return this.likesRepository.findOneByOrFail({ id });
  }

  findParentLikes(parent_id: string, parent_type: string) {
    return this.likesRepository.findOneByOrFail({ parent_id, parent_type })
  }

  findAllByOwner(user_id: string) {
    return this.likesRepository.findBy({ user_id });
  }
}
