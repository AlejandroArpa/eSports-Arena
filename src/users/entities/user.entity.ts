import { AuditableEntity }                                    from "src/common/entities/auditable.entity";
import { Point }                                              from "src/points/entities/point.entity";
import { Roles }                                              from "src/common/enums/roles.enum";
import { IsEmail, IsString }                                  from "class-validator";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn }  from "typeorm";
import { Match }                                              from "src/matches/entities/match.entity";

@Entity()
export class User extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;
  
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.PLAYER })
  role: Roles;

  @OneToMany(() => Point, point => point.user)
  points: Point[];

  @ManyToMany(() => Match, match => match.users)
  matches: Match[];
}
