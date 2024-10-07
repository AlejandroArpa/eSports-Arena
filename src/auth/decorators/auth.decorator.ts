import { Roles }                                    from "src/common/enums/roles.enum";
import { JwtAuthGuard }                             from "../guards/auth.guard";
import { RolGuard }                                 from "../guards/rol.guard";
import { ApiBearerAuth }                            from "@nestjs/swagger";
import { applyDecorators, SetMetadata, UseGuards }  from "@nestjs/common";


export function PrivateService(role?: Roles) {
  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(JwtAuthGuard, RolGuard),
    ApiBearerAuth('access-token')
  )
}