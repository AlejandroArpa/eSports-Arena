import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { PointQueryDto } from './dto/point-query.dto';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}


  @Get()
  findWithQuery(@Query() query: PointQueryDto) {
    return this.pointsService.findWithQuery(query);
  }



  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pointsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePointDto: UpdatePointDto) {
  //   return this.pointsService.update(+id, updatePointDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pointsService.remove(+id);
  // }
}
