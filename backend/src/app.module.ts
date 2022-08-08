import { config } from "dotenv";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

config({ path: join(process.cwd(), 'src/.env') })

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: process.env.MYSQL_PASSWORD,
      synchronize: true,
      entities: ['dist/**/*.entity.{js,ts}']
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
