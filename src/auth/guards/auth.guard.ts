import { AuthGuard }                                            from "@nestjs/passport";
import { ExecutionContext, Injectable, UnauthorizedException }  from "@nestjs/common";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException("You don't have access to this resource");
    }
    return user;
  }
}