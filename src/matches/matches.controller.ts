import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrivateService } from 'src/auth/decorators/auth.decorator';
import { Roles }          from 'src/common/enums/roles.enum';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @PrivateService(Roles.ADMIN)
  @Get('random/:id')
  createRandomMatch(@Param('id', ParseIntPipe) id: number) {
    return this.matchesService.generateRandomMatch(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchesService.update(+id, updateMatchDto);
  }


}
