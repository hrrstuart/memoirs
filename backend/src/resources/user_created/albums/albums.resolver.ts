import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { AlbumsService } from './albums.service';
import { CreateAlbumInput } from './dto/create-album.input';

// Entities
import { Album } from './album.entity';
import { User } from 'src/resources/user/user.entity';
import { Post } from 'src/resources/user_created/posts/post.entity';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';

@Resolver(() => Album)
export class AlbumsResolver {
  constructor(private readonly albumsService: AlbumsService) {}

  @Mutation(() => Album)
  @UseGuards(AuthenticatedGuard)
  createAlbum(@Args('createAlbumInput') createAlbumInput: CreateAlbumInput, @Context() context) {
    return this.albumsService.create(context.req.user.id, createAlbumInput);
  }

  @Query(() => [Album], { description: "Get albums by ID" })
  albums() {
    return this.albumsService.findAll();
  }

  @Query(() => Album, { description: "Get album by ID" })
  album(@Args('id', { type: () => String }) id: string) {
    return this.albumsService.findOne(id);
  }

  @ResolveField(returns => User)
  user(@Parent() album: Album): Promise<User> {
    return this.albumsService.getOwner(album.userId)
  }

  @ResolveField(returns => [Post])
  posts(@Parent() album: Album): Promise<Post[]> {
    return this.albumsService.getPosts(album.id)
  }
}
