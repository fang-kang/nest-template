/* eslint-disable prettier/prettier */
/*
 * @file:  全局异常拦截  http exception -> any exception
 * @copyright: fk
 * @author: fk
 * @Date: 2021年03月28 16:57:04
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import formatTime from '../common/date';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
    const exceptionRes: any = exception.getResponse();
    const { code, message, error } = exceptionRes;
    console.log(status);
    response.status(status).json({
      code: code || status,
      time: formatTime(new Date(), 'YYYY-MM-DD hh:mm:ss'),
      path: request.url,
      error: 'Bad request',
      msg: typeof message == 'object' ? message[0] : message,
    });
  }
}
