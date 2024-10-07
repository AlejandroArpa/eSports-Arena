import { Roles }      from "src/common/enums/roles.enum";
import { 
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable }        from "@nestjs/common";
import { Reflector }  from "@nestjs/core";


@Injectable()
export class RolGuard implements CanActivate {
  constructor(
    private reflector: Reflector 
  ){}

  canActivate(context: ExecutionContext)  {
    const decoratorRol = this.reflector.get<Roles>('rol', context.getHandler());
    console.log("decoratorRol", decoratorRol);
    if(!decoratorRol) return true;
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if(user.rol !== decoratorRol) throw new ForbiddenException("You don't have access to this resource");
    return true;
  }
}