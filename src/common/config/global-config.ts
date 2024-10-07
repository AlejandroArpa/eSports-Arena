import { INestApplication, ValidationPipe } from "@nestjs/common";
import { HandlerError }                     from "../errors";


export const globalConfig = ( app: INestApplication ) => {
  app.useGlobalPipes( new ValidationPipe( 
      {
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
      }
    )
  )
  app.useGlobalFilters(new HandlerError());
  app.enableCors();
  app.setGlobalPrefix('api');

}