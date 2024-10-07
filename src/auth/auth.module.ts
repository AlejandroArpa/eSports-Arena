import { User }           from 'src/users/entities/user.entity';
import { JWTStratey }     from './strategies/JWT-strategy';
import { UsersModule }    from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { TypeOrmModule }  from '@nestjs/typeorm';
import { Module }         from '@nestjs/common';
import { AuthService }    from './auth.service';
import { ConfigService }  from '@nestjs/config';
import { JwtModule }      from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.registerAsync({
      imports: [],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10m' }
    }),
    inject: [ConfigService]
  }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTStratey
  ],
})
export class AuthModule {}
