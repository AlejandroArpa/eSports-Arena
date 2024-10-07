import { TryCatch }       from 'src/common/decorators/try-catch.decorator';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { PointQueryDto }  from './dto/point-query.dto';
import { Injectable }     from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { Repository } from 'typeorm';


@Injectable()
@TryCatch()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private pointsRepository: Repository<Point>
  ) {}
  create(createPointDto: CreatePointDto) {
    return 'This action adds a new point';
  }

  findWithQuery(pointQuery : PointQueryDto) {
    const { page, limit, ...query } = pointQuery;
    const queryStr = this.pointsRepository.createQueryBuilder('point').leftJoinAndSelect('point.user', 'user');
    for(const key in query){
      queryStr.andWhere(`point.${key} = :${key}`, { [key]: query[key] });
    }
    return queryStr.skip((page - 1) * limit).take(limit).getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} point`;
  }

  update(id: number, updatePointDto: UpdatePointDto) {
    return `This action updates a #${id} point`;
  }

  remove(id: number) {
    return `This action removes a #${id} point`;
  }
}
