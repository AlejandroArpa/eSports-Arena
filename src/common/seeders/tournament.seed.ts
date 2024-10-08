import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Point } from "src/points/entities/point.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";



@Injectable()
export class TournamentsSeed {
  constructor(
    @InjectRepository(Point)
    private pointsRepository: Repository<Point>,
    @InjectRepository(Tournament)
    private tournamentsRepository: Repository<Tournament>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async seed() {
    const tournament = [
      {
        name: 'Tournament One',
        maxPlayers: 16,
        startDate: new Date(),
        finished: false,
        numbersInitialMatches: 8,
      }
    ]
    const players = [
      { email: 'player1@example.com', name: 'Player One' },
      { email: 'player2@example.com', name: 'Player Two' },
      { email: 'player3@example.com', name: 'Player Three' },
      { email: 'player4@example.com', name: 'Player Four' },
      { email: 'player5@example.com', name: 'Player Five' },
      { email: 'player6@example.com', name: 'Player Six' },
      { email: 'player7@example.com', name: 'Player Seven' },
      { email: 'player8@example.com', name: 'Player Eight' },
      { email: 'player9@example.com', name: 'Player Nine' },
      { email: 'player10@example.com', name: 'Player Ten' },
      { email: 'player11@example.com', name: 'Player Eleven' },
      { email: 'player12@example.com', name: 'Player Twelve' },
      { email: 'player13@example.com', name: 'Player Thirteen' },
      { email: 'player14@example.com', name: 'Player Fourteen' },
      { email: 'player15@example.com', name: 'Player Fifteen' },
      { email: 'player16@example.com', name: 'Player Sixteen' },
    ];
    console.log('Tournament seed');
    const existTournament = await this.tournamentsRepository.findOne({ where: { name: 'Tournament One' } });    
    if(existTournament) return;
    const newTournament = this.tournamentsRepository.create(tournament);
    await this.tournamentsRepository.save(newTournament);
    const getTournament = await this.tournamentsRepository.findOne({ where: { name: 'Tournament One' } });
    await Promise.all(players.map(async (player) => {
      const getPlayer = await this.usersRepository.findOne({ where: { email: player.email } });
      const newPoints = this.pointsRepository.create({ user: getPlayer, tournament: getTournament });
      await this.pointsRepository.save(newPoints);
    }))
  }
}