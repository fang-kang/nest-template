/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { ValidationPipe } from 'libs/common/pipes/validation.pipe';
import { TransformInterceptor } from 'libs/common/interface/transform.interceptor';
import { HttpExceptionFilter } from 'libs/common/filters/http-exception.filter';
import config from 'libs/common/config';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //开启一个全局验证管道
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  const devMode = process.env.NODE_ENV === 'development';
  let rootDir: string
  if (devMode) {
    rootDir = join(__dirname, '..');
  } else {
    rootDir = join(__dirname, '.');
  }
  app.use('/public', express.static(join(rootDir, 'public')));
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle('接口文档') //标题
    .setDescription('接口文档介绍') //文档介绍
    .setVersion('1.0.0') //文档版本
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // setup()依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
  SwaggerModule.setup('/doc', app, document);
  //跨域
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  await app.listen(config.PORT);
}
bootstrap();
