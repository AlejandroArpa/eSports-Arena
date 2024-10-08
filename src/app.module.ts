import { DatabaseConfig }     from './common/config/db-config';
import { PointsModule } from './points/points.module';
import { UsersModule }        from './users/users.module';
import { AuthModule }         from './auth/auth.module';
import { Module, OnModuleInit }             from '@nestjs/common';
import { ConfigModule }       from '@nestjs/config';
import { TypeOrmModule }      from '@nestjs/typeorm';
import { UsersSeed } from './common/seeders/users.seed';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TournamentsSeed } from './common/seeders/tournament.seed';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    AuthModule,
    PointsModule,
    TournamentsModule,
    MatchesModule,
  ],
  providers: [
    UsersSeed,
    TournamentsSeed,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly usersSeed: UsersSeed, private readonly tournamentSeed: TournamentsSeed) {}

  async onModuleInit() {
    console.log('Seeding data...');
    await this.usersSeed.seed();
    await this.tournamentSeed.seed();
  }
}
