import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from "@nestjs/passport"
import { UserModule } from '../user_relations/user/user.module';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UserModule
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, SessionSerializer]
})
export class AuthModule {}
