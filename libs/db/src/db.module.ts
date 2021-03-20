/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'libs/common/config';
import { User } from './entity/user.entity';
const entityArr = [User];

const entity = TypeOrmModule.forFeature(entityArr);

@Global()
@Module({
  imports: [
    entity,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: config.DATABASE.user,
          password: config.DATABASE.password,
          database: config.DATABASE.database,
          entities: entityArr,
          synchronize: true,
          charset: 'utf8mb4',
        };
      },
    }),
  ],
  providers: [],
  exports: [entity],
})
export class DbModule { }
