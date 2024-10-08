import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { AddPlayerDto } from './dto/add-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { User } from 'src/users/entities/user.entity';
import { Point } from 'src/points/entities/point.entity';
import { TryCatch } from 'src/common/decorators/try-catch.decorator';
import { Match } from 'src/matches/entities/match.entity';

@TryCatch()
@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament) 
    private tournamentsRepository: Repository<Tournament>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Point)
    private pointsRepository: Repository<Point>,
    @InjectRepository(Match)
    private matchesRepository: Repository<Match>
  ){}

  async addPlayer(addPlayer: AddPlayerDto) {
    const player = await this.usersRepository.findOne({ where: { id: addPlayer.userId } });
    if(!player) throw new NotFoundException(`User with id ${addPlayer.userId} not found`);
    const tournament = await this.tournamentsRepository.findOne({ where: { id: addPlayer.tournamentId } });
    if(!tournament) throw new NotFoundException(`Tournament with id ${addPlayer.tournamentId} not found`);
    const players = await this.pointsRepository.find({ where: { tournament: tournament } });
    console.log(players);
  }

  async getAllTournaments() {
    return await this.tournamentsRepository.find();
  }

  async findOne(id: number) {    
    const tournament = await this.tournamentsRepository.findOne({ where: { id } });    
    if(!tournament) throw new NotFoundException(`Tournament with id ${id} not found`);
    if(tournament.finished){
        const players = await this.pointsRepository.find({where: {tournament}, relations: ['user']});   
        const sanitizedPlayers = players.map(point => {
          const { password, ...sanitizedUser } = point.user;
          return { ...point, user: sanitizedUser };
        });     
        const sortedPlayers = sanitizedPlayers.sort((a, b) => b.points - a.points);
        const winner = sortedPlayers[0];
        const user = await this.usersRepository.findOne({where: {id: winner.user.id}});
        const {password, ...result} = user;
        return {winner: result, players: sortedPlayers, ...tournament};
      }
    return tournament;
  }

  async create(createTournament: CreateTournamentDto){
    const tournament = this.tournamentsRepository.findOne({where: { name: createTournament.name }});
    if(tournament) throw new BadRequestException("Tournament already exists")
    const newTournament = this.tournamentsRepository.create(createTournament);
    await this.tournamentsRepository.save(newTournament);
    return newTournament;
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto) {
    const tournament = await this.tournamentsRepository.findOne({ where: { id } });
    if(!tournament) throw new NotFoundException(`Tournament with id ${id} not found`);
    if(!tournament.finished){
      const matches = await this.matchesRepository.find({where: {tournament}})
      const allMatchesFinished = matches.every(match => match.finished);
      if(allMatchesFinished){
        tournament.finished = true;
      }
      const {finished, ...newTournament} = updateTournamentDto;
      this.tournamentsRepository.merge(tournament, newTournament);
      await this.tournamentsRepository.save(tournament);
      return tournament;
    }
    throw new BadRequestException(`Tournament with id ${id} is finished`);
  }
}
