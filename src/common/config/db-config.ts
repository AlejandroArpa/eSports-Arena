import { Tournament }                                   from 'src/tournaments/entities/tournament.entity';
import { Match }                                        from 'src/matches/entities/match.entity';
import { Point }                                        from 'src/points/entities/point.entity';
import { User }                                         from 'src/users/entities/user.entity';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory }  from '@nestjs/typeorm';
import { Injectable }                                   from '@nestjs/common';
import { ConfigService }                                from '@nestjs/config';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PWD'),
      database: this.configService.get('DB_NAME'),
      entities: [User, Point, Tournament, Match],
      synchronize: true,
    };
  }
}
