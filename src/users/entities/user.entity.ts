import { Roles }                                  from "src/common/enums/roles.enum";
import { IsEmail, IsString }                      from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;
}
