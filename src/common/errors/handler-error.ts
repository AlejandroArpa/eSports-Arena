import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response }                                             from "express";


@Catch(HttpException)
export class HandlerError implements ExceptionFilter{
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const request = ctx.getRequest();
    const exceptionResponse = exception.getResponse();
    const exceptionMessage = exceptionResponse['message'];
    const message = Array.isArray(exceptionMessage) 
      ? exceptionMessage.join(', ') 
      : exception.message;
    
    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method
    })  
  }
}