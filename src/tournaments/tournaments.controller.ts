import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { AddPlayerDto } from './dto/add-player.dto';
import { PrivateService } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/common/enums/roles.enum';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @PrivateService()
  @Post()
  addPlayer(@Body() addPlayer: AddPlayerDto){
    return this.tournamentsService.addPlayer(addPlayer);
  }

  @Get()
  findAll() {
    return this.tournamentsService.getAllTournaments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(+id);
  }

  @PrivateService(Roles.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentsService.update(+id, updateTournamentDto);
  }

  @PrivateService(Roles.ADMIN)
  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create(createTournamentDto);
  }
}
