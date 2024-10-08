import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { PointQueryDto }  from './dto/point-query.dto';
import { PointsService }  from './points.service';
import { ApiTags }        from '@nestjs/swagger';
import { 
  Controller, 
  Get, 
  Query 
}                         from '@nestjs/common';

@ApiTags('points')
@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}


  @Get()
  findWithQuery(@Query() query: PointQueryDto) {
    return this.pointsService.findWithQuery(query);
  }
}
