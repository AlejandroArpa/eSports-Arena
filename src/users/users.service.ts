import { User }                           from './entities/user.entity';
import { CreateUserDto }                  from './dto/create-user.dto';
import { UpdateUserDto }                  from './dto/update-user.dto';
import { InjectRepository }               from '@nestjs/typeorm';
import { Injectable, NotFoundException }  from '@nestjs/common';
import { Not, Repository }                from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne( { where: { email: createUserDto.email } } );
    if(user) throw new NotFoundException(`User with email ${createUserDto.email} already exists`);
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne( { where: { email } } );
    if(!user) throw new NotFoundException(`User with email ${email} not found`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
