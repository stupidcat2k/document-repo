import { SERVER_ERROR_MESSAGE } from './../constants';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseObject } from '../dto/response-object.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.handleResponse(response, exception);
    this.handleLogging(request, exception);
  }

  private handleLogging(request: Request, exception: unknown) {
    const { ip, method, originalUrl: url } = request;
    const userAgent = request.get('user-agent') || '';
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
    }

    Logger.error(
      `[API] '${method} ${url}' 'Message: ${message}' '${userAgent}' '${ip}'`,
    );
  }

  private handleResponse(response: Response, exception: unknown) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionMessage: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : SERVER_ERROR_MESSAGE;

    const responseObject: ResponseObject<any> =
      exceptionMessage instanceof Object
        ? ResponseObject.fail(
            exceptionMessage,
            exceptionMessage.message || null,
          )
        : ResponseObject.fail(null, exceptionMessage);

    response.status(status).json(responseObject);
  }
}
