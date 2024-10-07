import { Point }            from './entities/point.entity';
import { PointsController } from './points.controller';
import { PointsService }    from './points.service';
import { TypeOrmModule }    from '@nestjs/typeorm';
import { Module }           from '@nestjs/common';

@Module({
  controllers: [PointsController],
  providers: [PointsService],
  imports: [ TypeOrmModule.forFeature([Point]) ],
  exports: [PointsService, TypeOrmModule]
})
export class PointsModule {}
