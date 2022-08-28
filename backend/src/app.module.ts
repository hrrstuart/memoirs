// Packages
import { config } from "dotenv";
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from "@nestjs/typeorm";

// Local Files
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { UserModule } from './resources/user_relations/user/user.module';
import { PostsModule } from './resources/user_created/posts/posts.module';
import { AlbumsModule } from './resources/user_created/albums/albums.module';
import { PostLikesModule } from "./resources/user_created/post_likes/postlikes.module";
import { AuthModule } from "./resources/auth/auth.module";
import { FollowModule } from "./resources/user_relations/follow/follow.module";

config({ path: join(process.cwd(), 'src/.env') })

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: {
        settings: {
          'request.credentials': 'include'
        }
      }
      
    }),
    TypeOrmModule.forRoot({
      database: 'atorus',
      type: 'mysql',
      username: 'root',
      port: 3306,
      password: process.env.MYSQL_PASSWORD,
      entities: ['dist/**/*.entity{.js,.ts}'],
      synchronize: true
    }),
    UserModule,
    PostsModule,
    AlbumsModule,
    PostLikesModule,
    AuthModule,
    FollowModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
