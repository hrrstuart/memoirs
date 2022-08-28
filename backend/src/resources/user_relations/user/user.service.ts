import { Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";

import { CreateUserInput } from './dto/create-user.input';

// Services
import { AlbumsService } from 'src/resources/user_created/albums/albums.service';
import { AlbumMemberService } from '../album_member/album-member.service';
import { CommentsService } from '../../user_created/comments/comments.service';
import { UserFollowService } from '../user_follow/user_follow.service';
import { PostLikesService } from '../../user_created/post_likes/postlikes.service';
import { PostsService } from 'src/resources/user_created/posts/posts.service';

// Entities
import { Album } from 'src/resources/user_created/albums/album.entity';
import { AlbumMember } from '../album_member/album-member.entity';
import { Comment } from '../../user_created/comments/comment.entity';
import { UserFollow } from '../user_follow/user_follow.entity';
import { PostLike } from '../../user_created/post_likes/postlike.entity';
import { Post } from 'src/resources/user_created/posts/post.entity';
import { User } from './user.entity';
import { ReferencedPostsService } from 'src/resources/user_created/referenced_posts/referenced_posts.service';
import { ReferencedPost } from 'src/resources/user_created/referenced_posts/referenced_post.entity';
import { AlbumFollow } from '../album_follow/album_follow.entity';
import { AlbumFollowService } from '../album_follow/album_follow.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @Inject(forwardRef(() => PostsService)) private postService: PostsService,
        @Inject(forwardRef(() => AlbumMemberService)) private albumMemberService: AlbumMemberService,
        @Inject(forwardRef(() => AlbumsService)) private albumsService: AlbumsService,
        @Inject(forwardRef(() => CommentsService)) private commentsService: CommentsService,
        @Inject(forwardRef(() => PostLikesService)) private likesService: PostLikesService,
        @Inject(forwardRef(() => UserFollowService)) private userFollowsService: UserFollowService,
        @Inject(forwardRef(() => AlbumFollowService)) private albumFollowsService: AlbumFollowService,
        @Inject(forwardRef(() => ReferencedPostsService)) private referencedPostsService: ReferencedPostsService,
    ) {}

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(createUserInput.password, salt);
        
        const newUser = this.userRepository.create({
            ...createUserInput,
            password: hash
        });

        return this.userRepository.save(newUser);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(searchType: string, searchQuery: string): Promise<User> {
        return searchType === "id" ?
            this.userRepository.findOneByOrFail({ id: searchQuery }) :
            this.userRepository.findOneByOrFail({ username: searchQuery });
    }

    getPosts(userId: string): Promise<Post[]> {
        return this.postService.findAllByOwner(userId);
    }

    getReferencedPosts(userId: string): Promise<ReferencedPost[]> {
        return this.referencedPostsService.findAllByUser(userId);
    }

    getAlbumMemberships(userId: string): Promise<AlbumMember[]> {
        return this.albumMemberService.findMembersByUser(userId);
    }

    getAlbums(user_id: string): Promise<Album[]> {
        return this.albumsService.findAllByOwner(user_id);
    }

    getComments(user_id: string): Promise<Comment[]> {
        return this.commentsService.findAllByOwner(user_id);
    }

    getLikes(user_id: string): Promise<PostLike[]> {
        return this.likesService.findAllByOwner(user_id);
    }

    getFollowing(user_id: string): Promise<UserFollow[]> {
        return this.userFollowsService.findFollowing(user_id);
    }

    getFollowers(userId: string): Promise<UserFollow[]> {
        return this.userFollowsService.findFollowers(userId);
    }

    getAlbumsFollowing(userId: string): Promise<AlbumFollow[]> {
        return this.albumFollowsService.findAlbumsFollowing(userId);
    }
}
