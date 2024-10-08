import { Tournament }         from 'src/tournaments/entities/tournament.entity';
import { Point }              from 'src/points/entities/point.entity';
import { Match }              from './entities/match.entity';
import { MatchesController }  from './matches.controller';
import { MatchesService }     from './matches.service';
import { TypeOrmModule }      from '@nestjs/typeorm';
import { Module }             from '@nestjs/common';

@Module({
  controllers: [MatchesController],
  providers: [MatchesService],
  imports: [TypeOrmModule.forFeature([Match, Point, Tournament])],
})
export class MatchesModule {}
