import { Point }                        from "src/points/entities/point.entity";
import { IsBoolean, IsDate, IsNumber, IsString }  from "class-validator";
import { 
  Column, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn 
}                                       from "typeorm";

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  @IsString()
  name: string;

  @Column({ name: 'init_matches_num' })
  @IsNumber()
  numbersInitialMatches: number;

  @Column()
  @IsBoolean()
  finished: boolean;

  @Column()
  @IsDate()
  startDate: Date;

  // @OneToMany(() => Match, match => match.tournament)
  // matches: Match[];

  @Column()
  @IsNumber()
  maxPlayers: number;

  @OneToMany(()=> Point, point => point.tournament)
  points: Point[];
}
