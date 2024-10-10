import { PrivateService }       from 'src/auth/decorators/auth.decorator';
import { CreateTournamentDto }  from './dto/create-tournament.dto';
import { UpdateTournamentDto }  from './dto/update-tournament.dto';
import { Roles }                from 'src/common/enums/roles.enum';
import { TournamentsService }   from './tournaments.service';
import { AddPlayerDto }         from './dto/add-player.dto';
import { ApiTags }              from '@nestjs/swagger';
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param
}                               from '@nestjs/common';

@ApiTags('tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @PrivateService()
  @Post('/add-player')
  addPlayer(@Body() addPlayer: AddPlayerDto){
    return this.tournamentsService.addPlayer(addPlayer);
  }

  @Get()
  findAll() {
    return this.tournamentsService.getAllTournaments();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(+id);
  }

  @PrivateService(Roles.ADMIN)
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentsService.update(+id, updateTournamentDto);
  }

  @PrivateService(Roles.ADMIN)
  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {

    return this.tournamentsService.create(createTournamentDto);
  }
}
