import { Resolver, Query, Mutation, Args, ResolveField, Parent, Context } from '@nestjs/graphql';
import { AlbumFollowService } from './album_follow.service';
import { CreateAlbumFollowInput } from './dto/create-album_follow.input';
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
  createAlbumFollow(@Args('createFollowInput') createFollowInput: CreateAlbumFollowInput, @Context() context) {
    return this.albumFollowService.create(createFollowInput, context.req.user.id);
  }

  @Query(() => [AlbumFollow])
  albumFollows() {
    return this.albumFollowService.findAll();
  }

  //  Find followers of an album
  @Query(() => [AlbumFollow])
  findAlbumFollowers(@Args('albumId', { type: () => String }) albumId: string): Promise<AlbumFollow[]> {
    return this.albumFollowService.findFollowers(albumId);
  }

  //  Find albums a user is following
  @Query(() => [AlbumFollow])
  findAlbumFollowing(@Args('userId', { type: () => String }) userId: string) {
    return this.albumFollowService.findAlbumsFollowing(userId)
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
