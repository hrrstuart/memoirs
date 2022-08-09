import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { AlbumsService } from './albums.service';
import { Album } from './album.entity';
import { CreateAlbumInput } from './dto/create-album.input';
import { User } from 'src/resources/user/user.entity';
import { Post } from 'src/resources/user_created/posts/post.entity';

@Resolver(() => Album)
export class AlbumsResolver {
  constructor(private readonly albumsService: AlbumsService) {}

  @Mutation(() => Album)
  createAlbum(@Args('createAlbumInput') createAlbumInput: CreateAlbumInput) {
    return this.albumsService.create(createAlbumInput);
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
    return this.albumsService.getOwner(album.user_id)
  }

  @ResolveField(returns => [Post])
  posts(@Parent() album: Album): Promise<Post[]> {
    return this.albumsService.getPosts(album.id)
  }
}
