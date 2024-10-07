import { UsersModule }  from "src/users/users.module";
import { Module }       from "@nestjs/common";
import { HandlerError } from "./errors";

@Module({
  providers: [HandlerError],
  exports: [HandlerError],
  imports: [UsersModule]
})
export class CommonModule {}