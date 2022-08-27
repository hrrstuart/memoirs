import { Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumInput } from './dto/create-album.input';

// Services
import { PostsService } from 'src/resources/user_created/posts/posts.service';
import { UserService } from 'src/resources/user_relations/user/user.service';

// Entities
import { Album } from './album.entity';
import { User } from 'src/resources/user_relations/user/user.entity';
import { AlbumMember } from 'src/resources/user_relations/album_member/album-member.entity';
import { AlbumMemberService } from 'src/resources/user_relations/album_member/album-member.service';
import { Post } from '../posts/post.entity';
import { ReferencedPost } from '../referenced_posts/referenced_post.entity';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(Album) private albumRepository: Repository<Album>,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        @Inject(forwardRef(() => PostsService)) private postService: PostsService,
        @Inject(forwardRef(() => AlbumMemberService)) private albumMemberService: AlbumMemberService,
    ) {}

    create(userID: string, createAlbumInput: CreateAlbumInput): Promise<Album> {
        const newAlbum = this.albumRepository.create({
            userId: userID,
            ...createAlbumInput
        });

        return this.albumRepository.save(newAlbum);
    }

    findAll(): Promise<Album[]> {
        return this.albumRepository.find();
    }

    findAllByOwner(userId: string): Promise<Album[]> {
      return this.albumRepository.findBy({ userId });
    }

    findOne(id: string): Promise<Album> {
        return this.albumRepository.findOneBy({ id });
    }

    getPosts(albumId: string): Promise<Post[]> {
        return this.postService.findOriginalPosts(albumId);
    }

    getReferencedPosts(albumId: string): Promise<ReferencedPost[]> {
        return this.postService.findReferencedPosts(albumId);
    }

    getOwner(ownerId: string): Promise<User> {
        return this.userService.findOne("id", ownerId);
    }

    getAlbumMembers(albumId: string): Promise<AlbumMember[]> {
        return this.albumMemberService.findMembersByAlbum(albumId);
    }
}
