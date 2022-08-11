import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedGaurd } from './authenticated.gaurd';
import { LocalAuthGaurd } from './local-auth.gaurd';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGaurd)
    @Post('login')
    login(@Req() req) {
        return req.user;
    }

    @UseGuards(AuthenticatedGaurd)
    @Get('protected')
    protectedTest(@Req() req) {
        return req.user;
    }
}
