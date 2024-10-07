import { globalConfig, SwaggerConfig }  from './common/config/';
import { ConfigService }                from '@nestjs/config';
import { NestFactory }                  from '@nestjs/core';
import { AppModule }                    from './app.module';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  SwaggerConfig(app);
  globalConfig(app);
  await app.listen(port);
}
startServer();
