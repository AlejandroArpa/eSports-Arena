import { IsArray, IsBoolean } from "class-validator";
import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export interface Score {
  goals: number;
  userId: number;
}

@Entity()
export class Match extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, user => user.matches)
  users: User[];

  @Column('jsonb')
  @IsArray()
  scores: Score[];

  @ManyToOne(() => Tournament, tournament => tournament.matches)
  tournament: Tournament;

  @Column({ default: false })
  @IsBoolean()
  finished: boolean;
}
