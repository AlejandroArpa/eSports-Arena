import { TournamentsModule }  from "src/tournaments/tournaments.module";
import { PointsModule }       from "src/points/points.module";
import { UsersModule }        from "src/users/users.module";
import { Module }             from "@nestjs/common";
import { HandlerError }       from "./errors";

@Module({
  providers: [HandlerError],
  exports: [HandlerError],
  imports: [UsersModule, PointsModule, TournamentsModule]
})
export class CommonModule {}