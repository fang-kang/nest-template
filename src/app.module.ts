import { Module } from '@nestjs/common';
import { CommonModule } from 'libs/common';
import { DbModule } from 'libs/db';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [DbModule, CommonModule, UserModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
