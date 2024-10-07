import { Roles }                                  from "src/common/enums/roles.enum";
import { IsEmail, IsEnum, IsNotEmpty, IsString }  from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
    
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
