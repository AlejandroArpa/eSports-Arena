import { Tournament }     from "src/tournaments/entities/tournament.entity";
import { User }           from "src/users/entities/user.entity";
import { IsNumber }       from "class-validator";
import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn 
}                         from "typeorm";


@Entity() 
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 0})
  @IsNumber()
  points: number;

  @ManyToOne(() => User, user => user.points)
  @JoinColumn({name: 'user_id'})
  user: User;

  @ManyToOne(() => Tournament, tournament => tournament.points)
  @JoinColumn({name: 'tournament_id'})
  tournament: Tournament;
}
