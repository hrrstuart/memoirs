import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateFollowInput } from './dto/create-follow.input';
import { UpdateFollowInput } from './dto/update-follow.input';
import { Follow } from './follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
    @Inject(forwardRef(() => UserService)) private userService: UserService
    ) {}

  create(createFollowInput: CreateFollowInput, followerId: string) {
    const newFollow = this.followRepository.create({
      followerId,
      ...createFollowInput
    });

    return this.followRepository.save(newFollow);
  }

  findAll() {
    return `This action returns all follow`;
  }

  findFollowing(user_id: string) {
    return this.followRepository.findBy({
      followerId: user_id
    })
  }

  findFollowers(id: string): Promise<Follow[]> {
    return this.followRepository.findBy({
      followingId: id
    });
  }

  getFollower(id: string) {
    return this.userService.findOne("id", id);
  }
}
