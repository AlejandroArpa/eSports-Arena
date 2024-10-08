import { Match }                  from 'src/matches/entities/match.entity';
import { Point }                  from 'src/points/entities/point.entity';
import { User }                   from 'src/users/entities/user.entity';
import { Tournament }             from './entities/tournament.entity';
import { TournamentsController }  from './tournaments.controller';
import { TournamentsService }     from './tournaments.service';
import { TypeOrmModule }          from '@nestjs/typeorm';
import { Module }                 from '@nestjs/common';

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService],
  imports: [TypeOrmModule.forFeature([Tournament, User, Point, Match])],
  exports: [TournamentsService, TypeOrmModule]
})
export class TournamentsModule {}
