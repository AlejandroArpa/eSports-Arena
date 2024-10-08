import { PrivateService }           from 'src/auth/decorators/auth.decorator';
import { Roles }                    from 'src/common/enums/roles.enum';
import { UpdateMatchDto }           from './dto/update-match.dto';
import { MatchesService }           from './matches.service';
import { ApiExtraModels, ApiTags }  from '@nestjs/swagger';
import { 
  Controller, 
  Get, 
  Body, 
  Patch, 
  Param, 
  ParseIntPipe 
}                         from '@nestjs/common';


@ApiTags('matches')
@ApiExtraModels()
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @PrivateService(Roles.ADMIN)
  @Get('random/:id')
  createRandomMatch(@Param('id', ParseIntPipe) id: number) {
    return this.matchesService.generateRandomMatch(id);
  }

  @PrivateService(Roles.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchesService.update(+id, updateMatchDto);
  }


}
