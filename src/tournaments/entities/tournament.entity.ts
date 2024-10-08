import { Point }                        from "src/points/entities/point.entity";
import { IsBoolean, IsDate, IsNumber, IsString }  from "class-validator";
import { 
  Column, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn 
}                                       from "typeorm";
import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Match } from "src/matches/entities/match.entity";

@Entity()
export class Tournament extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  @IsString()
  name: string;

  @Column({ name: 'init_matches_num'})
  @IsNumber()
  numbersInitialMatches: number;

  @Column({default: false})
  @IsBoolean()
  finished: boolean;

  @Column()
  @IsDate()
  startDate: Date;

  @OneToMany(() => Match, match => match.tournament)
  matches: Match[];

  @Column({ default: 8 })
  @IsNumber()
  maxPlayers: number;

  @OneToMany(()=> Point, point => point.tournament)
  points: Point[];
}
