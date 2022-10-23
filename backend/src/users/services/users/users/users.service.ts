import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    users = [{
        id: 'a',
        username: 'rr'
    }, {
        id: 'b',
        username: 'hrrstuart'
    }]

    findUserByUsername(username: string) {
        return this.users.find(u => u.username === username);
    }

}
