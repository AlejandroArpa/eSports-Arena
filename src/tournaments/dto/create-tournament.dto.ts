import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTournamentDto {

  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  finished?: boolean;

  @IsNumber()
  @IsOptional()
  maxPlayers?: number;

  @IsDate()
  startDate: Date;
}
