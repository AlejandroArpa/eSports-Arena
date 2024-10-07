import { IsNumber } from "class-validator";


export class AddPlayerDto {
  @IsNumber()
  tournamentId: number;

  @IsNumber()
  userId: number;
}