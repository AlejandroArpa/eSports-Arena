import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    const validApiKey = this.configService.get('API_KEY');

    if (apiKey === validApiKey) {
      return true; // La API Key es válida, permitir el acceso.
    }

    throw new UnauthorizedException('Invalid API key'); // Si no es válida, lanzar excepción.
  }
}
