import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local";

import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(AuthService) private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string) {
        const validatedUser = await this.authService.validateUser(username, password);

        if (!validatedUser) {
            throw new UnauthorizedException();
        }

        return validatedUser;
    }
    
}