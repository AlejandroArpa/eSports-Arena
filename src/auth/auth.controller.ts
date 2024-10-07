import { TryCatch }                         from 'src/common/decorators/try-catch.decorator';
import { CreateUserDto }                    from 'src/users/dto/create-user.dto';
import { Body, Controller, HttpCode, Post}  from '@nestjs/common';
import { AuthService }                      from './auth.service';
import { LoginUserDto }                     from './dto';

@TryCatch()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  register(@Body() registerDto: CreateUserDto){
    return this.authService.register(registerDto);
  }

}
