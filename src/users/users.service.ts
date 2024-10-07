import { TryCatch }                       from 'src/common/decorators/try-catch.decorator';
import { User }                           from './entities/user.entity';
import { CreateUserDto }                  from './dto/create-user.dto';
import { UpdateUserDto }                  from './dto/update-user.dto';
import { InjectRepository }               from '@nestjs/typeorm';
import { Injectable, NotFoundException }  from '@nestjs/common';
import { Repository }                     from 'typeorm';

@Injectable()
@TryCatch()
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
    const user = await this.usersRepository.findOne({ where: { id } });
    if(!user) throw new NotFoundException(`User with id ${id} not found`);
    const { password, ...result } = user;
    return result;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne( { where: { email } } );
    if(!user) throw new NotFoundException(`User with email ${email} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if(!user) throw new NotFoundException(`User with id ${id} not found`);
    this.usersRepository.merge(user, updateUserDto);
    await this.usersRepository.save(user);
    return user;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if(!user) throw new NotFoundException(`User with id ${id} not found`);
    await this.usersRepository.softDelete({ id });
    const { password, ...result } = user;
    return result;
  }
}
