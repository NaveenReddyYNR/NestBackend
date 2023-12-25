import { Module } from '@nestjs/common';
import { CoinController } from './coin.controller';
import { CoinService } from './coin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinEntity } from './coin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoinEntity])],
  controllers: [CoinController],
  providers: [CoinService],
})
export class CoinModule {}
