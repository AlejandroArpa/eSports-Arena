import { TryCatch }                         from 'src/common/decorators/try-catch.decorator';
import { User }                             from 'src/users/entities/user.entity';
import { CreateUserDto }                    from 'src/users/dto/create-user.dto';
import { UsersService }                     from 'src/users/users.service';
import { InjectRepository }                 from '@nestjs/typeorm';
import { BadRequestException, Injectable }  from '@nestjs/common';
import { JwtService }                       from '@nestjs/jwt';
import { Repository }                       from 'typeorm';
import * as bcrypt                          from 'bcrypt';
import { LoginUserDto }                     from './dto';


@Injectable()
@TryCatch()
export class AuthService {
  constructor( 
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService  ){}
  
  async login(loginUserDto: LoginUserDto){
    const user = await this.usersService.findOneByEmail(loginUserDto.email);
    if(!user) throw new BadRequestException('Invalid credentials');
    const comparePassword = await bcrypt.compare(loginUserDto.password, user.password);
    if(!comparePassword) throw new BadRequestException('Invalid credentials');
    const token = await this.generateToken(user);
    return token;
  }

  async register(registerDto: CreateUserDto){
    const user = await this.usersRepository.findOne( { where: { email: registerDto.email } } );
    if(user) throw new BadRequestException('User already exists');
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.usersService.create({ ...registerDto, password: hashedPassword });
    const token = await this.generateToken(newUser);
    return token;
  }

  async generateToken(user: User){
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

