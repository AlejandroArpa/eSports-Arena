import { DocumentBuilder, SwaggerModule }   from "@nestjs/swagger";
import { INestApplication }                 from "@nestjs/common";


export const SwaggerConfig = (app: INestApplication) => {
  const versionApp = '1.0';
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Documentation')
    .setVersion(versionApp)
    .addServer('/api')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}