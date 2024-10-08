import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { Point } from 'src/points/entities/point.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { TryCatch } from 'src/common/decorators/try-catch.decorator';

@TryCatch()
@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    @InjectRepository(Point)
    private pointRepository: Repository<Point>,
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  async generateRandomMatch(tournamentId: number) {
    const tournamentMatches = await this.matchRepository.find({
      where: { tournament: { id: tournamentId } },
    });
    if (tournamentMatches.length > 0)
      throw new BadRequestException('Tournament already has matches');
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
    });
    if (!tournament) throw new NotFoundException('Tournament not found');
    const players = await this.pointRepository.find({
      where: { tournament: tournament },
      relations: ['user'],
    }); 
    const playersIds = players.map((player) => player.user.id);
    console.log(playersIds);
    
    const shuffledPlayers = await this.shuffle(playersIds);
    const matches = [];
    console.log(shuffledPlayers);
    
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      const match = new Match();
      match.tournament = tournament;
      match.scores = [
        { userId: shuffledPlayers[i], goals: 0 },
        { userId: shuffledPlayers[i + 1], goals: 0 },
      ];
      matches.push(await this.matchRepository.save(match));
    }
    return matches;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['tournament'],
    });
    if (!match) throw new NotFoundException('Match not found');
    let isDraw = true;
    updateMatchDto.scores?.forEach((score) => {
      const player = match.scores.find(
        (player) => player.userId === score.userId,
      );
      if (player) {
        player.goals = score.goals;
        if (score.goals !== updateMatchDto.scores[0].goals) isDraw = false;
      } else throw new BadRequestException('Player not found');
    });

    if (!match.finished) {
      if(updateMatchDto.finished) {
        if (isDraw) {
          match.scores.forEach(async (player) => {
            const playerPoint = await this.pointRepository.findOne({
              where: {
                user: { id: player.userId },
                tournament: { id: match.tournament.id },
              },
            });
            playerPoint.points += 1;
            await this.pointRepository.save(playerPoint);
          });
        } else {
          const winner = match.scores.reduce((prev, current) =>
            prev.goals > current.goals ? prev : current,
          );
          const winnerPoint = await this.pointRepository.findOne({
            where: {
              user: { id: winner.userId },
              tournament: { id: match.tournament.id },
            },
          });
          winnerPoint.points += 3;
          await this.pointRepository.save(winnerPoint);
        }
      }
      await this.matchRepository.update(id, updateMatchDto);
      return this.matchRepository.findOne({ where: { id } });
    } else throw new BadRequestException('Match already finished');
  }

  async shuffle(players: number[]){
    
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]]; // Intercambio
    }
    return players;
  }
}
