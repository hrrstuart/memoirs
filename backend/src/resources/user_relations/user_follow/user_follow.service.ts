import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateFollowInput } from './dto/create-user_follow.input';
import { UserFollow } from './user_follow.entity';

@Injectable()
export class UserFollowService {
  constructor(
    @InjectRepository(UserFollow) private userFollowRepository: Repository<UserFollow>,
    @Inject(forwardRef(() => UserService)) private userService: UserService
    ) {}

  create(createFollowInput: CreateFollowInput, followerId: string) {
    const newFollow = this.userFollowRepository.create({
      followerId,
      ...createFollowInput
    });

    return this.userFollowRepository.save(newFollow);
  }

  findAll() {
    return this.userFollowRepository.find();
  }

  findFollowing(user_id: string) {
    return this.userFollowRepository.findBy({
      followerId: user_id
    })
  }

  findFollowers(id: string): Promise<UserFollow[]> {
    return this.userFollowRepository.findBy({
      followingId: id
    });
  }

  getUser(id: string) {
    return this.userService.findOne("id", id);
  }
}
