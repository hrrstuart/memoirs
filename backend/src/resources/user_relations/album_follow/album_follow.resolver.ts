import { Resolver, Query, Mutation, Args, ResolveField, Parent, Context } from '@nestjs/graphql';
import { AlbumFollowService } from './album_follow.service';
import { CreateFollowAlbumInput } from './dto/create-album_follow.input';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';

import { AlbumFollow } from './album_follow.entity';
import { User } from '../user/user.entity';
import { Album } from 'src/resources/user_created/albums/album.entity';

@Resolver(() => AlbumFollow)
export class FollowResolver {
  constructor(private readonly albumFollowService: AlbumFollowService) {}

  @Mutation(() => AlbumFollow)
  @UseGuards(AuthenticatedGuard)
  createFollow(@Args('createFollowInput') createFollowInput: CreateFollowAlbumInput, @Context() context) {
    return this.albumFollowService.create(createFollowInput, context.req.user.id);
  }

  @Query(() => [AlbumFollow])
  follows() {
    return this.albumFollowService.findAll();
  }

  @Query(() => [AlbumFollow], { description: "Get all followers of either an album or user" })
  findFollowers(@Args('id', { type: () => String }) id: string): Promise<AlbumFollow[]> {
    return this.albumFollowService.findFollowers(id);
  }

  @Query(() => [AlbumFollow], { description: "Find all users/albums a user is following" })
  findFollowing(@Args('user_id', { type: () => String }) user_id: string) {
    return this.albumFollowService.findAlbumsFollowing(user_id)
  }

  @ResolveField(returns => User)
  follower(@Parent() follow: AlbumFollow): Promise<User> {
    return this.albumFollowService.getFollower(follow.followerId);
  }

  @ResolveField(returns => Album)
  album(@Parent() follow: AlbumFollow): Promise<Album> {
    return this.albumFollowService.getFollowing(follow.followingAlbumId);
  }
}
