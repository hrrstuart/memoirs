import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { AlbumsService } from './albums.service';
import { CreateAlbumInput } from './dto/create-album.input';

// Entities
import { Album } from './album.entity';
import { User } from 'src/resources/user_relations/user/user.entity';
import { Post } from 'src/resources/user_created/posts/post.entity';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';
import { AlbumMember } from 'src/resources/user_relations/album_member/album-member.entity';
import { ReferencedPost } from '../referenced_posts/referenced_post.entity';
import { AlbumFollow } from 'src/resources/user_relations/album_follow/album_follow.entity';

@Resolver(() => Album)
export class AlbumsResolver {
  constructor(private readonly albumsService: AlbumsService) {}

  @Mutation(() => Album)
  @UseGuards(AuthenticatedGuard)
  createAlbum(@Args('createAlbumInput') createAlbumInput: CreateAlbumInput, @Context() context) {
    return this.albumsService.create(context.req.user.id, createAlbumInput);
  }

  @Mutation(returns => Boolean)
  deleteAlbum(@Args('albumId') albumId: string) {
    return this.albumsService.deleteAlbum(albumId);
  }

  @Query(() => [Album], { description: "Get albums by ID" })
  albums() {
    return this.albumsService.findAll();
  }

  @Query(() => Album, { description: "Get album by ID" })
  getAlbum(@Args('id', { type: () => String }) id: string) {
    return this.albumsService.findOne(id);
  }

  @ResolveField(returns => User)
  user(@Parent() album: Album): Promise<User> {
    return this.albumsService.getOwner(album.userId);
  }

  @ResolveField(returns => [AlbumMember])
  members(@Parent() album: Album): Promise<AlbumMember[]> {
    return this.albumsService.getAlbumMembers(album.id);
  }

  @ResolveField(returns => [Post])
  posts(@Parent() album: Album): Promise<Post[]> {
    return this.albumsService.getPosts(album.id)
  }

  @ResolveField(returns => [ReferencedPost])
  referencedPosts(@Parent() album: Album): Promise<ReferencedPost[]> {
    return this.albumsService.getReferencedPosts(album.id);
  }

  @ResolveField(returns => [AlbumFollow])
  followers(@Parent() album: Album): Promise<AlbumFollow[]> {
    return this.albumsService.getFollowers(album.id);
  }

}
