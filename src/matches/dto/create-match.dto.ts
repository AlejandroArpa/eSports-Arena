import { IsArray, IsBoolean, IsNumber, IsOptional } from "class-validator";

export class CreateMatchDto {
  @IsNumber()
  tournamentId: number;

  @IsNumber()
  userId: number;

  @IsArray()
  @IsOptional()
  scores?: { userId: number, goals: number }[];

  @IsBoolean()
  @IsOptional()
  finished?: boolean;
}
