import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { AddPlayerDto } from './dto/add-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { User } from 'src/users/entities/user.entity';
import { Point } from 'src/points/entities/point.entity';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament) 
    private tournamentsRepository: Repository<Tournament>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Point)
    private pointsRepository: Repository<Point>
  ){}

  async addPlayer(addPlayer: AddPlayerDto) {
    const player = await this.usersRepository.findOne({ where: { id: addPlayer.userId } });
    if(!player) throw new NotFoundException(`User with id ${addPlayer.userId} not found`);
    const tournament = await this.tournamentsRepository.findOne({ where: { id: addPlayer.tournamentId } });
    if(!tournament) throw new NotFoundException(`Tournament with id ${addPlayer.tournamentId} not found`);
    const players = await this.pointsRepository.find({ where: { tournament: tournament } });
    console.log(players);
    
    // if(tournament.maxPlayers  )
  }
}
