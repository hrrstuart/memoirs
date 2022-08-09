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
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { AlbumsModule } from './albums/albums.module';

config({ path: join(process.cwd(), 'src/.env') })

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
