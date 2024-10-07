import { User }             from './entities/user.entity';
import { UsersController }  from './users.controller';
import { UsersService }     from './users.service';
import { TypeOrmModule }    from '@nestjs/typeorm';
import { Module }           from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([User]),
  ]
})
export class UsersModule {}
