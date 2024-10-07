import { TransactionsModule } from './transactions/transactions.module';
import { ProductsModule }     from './products/products.module';
import { DatabaseConfig }     from './common/config/db-config';
import { UsersModule }        from './users/users.module';
import { AuthModule }         from './auth/auth.module';
import { Module }             from '@nestjs/common';
import { ConfigModule }       from '@nestjs/config';
import { TypeOrmModule }      from '@nestjs/typeorm';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    TransactionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    AuthModule,

  ],
})
export class AppModule {}
