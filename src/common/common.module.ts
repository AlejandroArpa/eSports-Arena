import { Module }       from "@nestjs/common";
import { HandlerError } from "./errors";

@Module({
  providers: [HandlerError],
  exports: [HandlerError]
})
export class CommonModule {}