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

  @Column()
  @IsNumber()
  points: number;

  @ManyToOne(() => User, user => user.points)
  @JoinColumn({name: 'user_id'})
  user: User;
}
