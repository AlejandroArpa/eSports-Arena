import { IsNumber, IsOptional, Min } from "class-validator";

export class PointQueryDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  tournamentId?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;
}
