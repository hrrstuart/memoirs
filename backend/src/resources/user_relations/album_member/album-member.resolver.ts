import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateAlbumMemberInput } from './dto/create-user.input';
import { AlbumMemberService } from './album-member.service';

// Entities
import { AlbumMember } from './album-member.entity';
import { User } from '../user/user.entity';

@Resolver(of => AlbumMember)
export class AlbumMemberResolver {
    constructor(private albumMemberService: AlbumMemberService) {}

    @Query(returns => [AlbumMember])
    albumMembers(): Promise<AlbumMember[]> {
        return this.albumMemberService.findAll();
    }

    @Query(returns => AlbumMember)
    getAlbumMember(
      @Args('query', {type: () => String}) query: string,
    ): Promise<AlbumMember> {
        return this.albumMemberService.findOne(query);
    }

    @Mutation(returns => AlbumMember)
    //  Guard that only admins/owner of album can add to group
    createAlbumMember(@Args('createAlbumMember') createAlbumMember: CreateAlbumMemberInput): Promise<AlbumMember> {
        return this.albumMemberService.createAlbumMember(createAlbumMember);
    }

    @ResolveField(returns => [User])
    user(@Parent() albumMember: AlbumMember): Promise<User> {
      return this.albumMemberService.getUser(albumMember.userId);
    }
}
