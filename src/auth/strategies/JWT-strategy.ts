import { UsersService }                       from "src/users/users.service";
import { PassportStrategy }                   from "@nestjs/passport";
import { Injectable, UnauthorizedException }  from "@nestjs/common";
import { ConfigService }                      from "@nestjs/config";
import { Strategy, ExtractJwt }               from "passport-jwt";


@Injectable()
export class JWTStratey extends PassportStrategy(Strategy){
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ){ 
    const jwtSecret = configService.get('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }
  async validate(payload: any){
    const user = await this.usersService.findOne(payload.id);
    if(!user){
      throw new UnauthorizedException('User not found');
    }
    return payload;
  }
}