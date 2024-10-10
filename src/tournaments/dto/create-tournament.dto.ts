import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTournamentDto {

  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  finished?: boolean;

  @IsNumber()
  maxPlayers: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date;

  @IsNumber()
  @IsOptional()
  numbersInitialMatches: number;
}
