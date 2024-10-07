import { AuditableEntity }                                    from "src/common/entities/auditable.entity";
import { Point }                                              from "src/points/entities/point.entity";
import { Roles }                                              from "src/common/enums/roles.enum";
import { IsEmail, IsString }                                  from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn }  from "typeorm";

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
}
