import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinModule } from './coin/coin.module';
import { typeOrmConfig } from './config/typeorm.config';
import { LoginModule } from './login/login.module';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    LoginModule,
    CoinModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
