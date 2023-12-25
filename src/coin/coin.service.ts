import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { CoinDto } from './coin-dto/create-coin.dto';
import { CoinEntity } from './coin.entity';

@Injectable()
export class CoinService {
  constructor(
    @InjectRepository(CoinEntity)
    private readonly coinRep: Repository<CoinEntity>,
  ) {}

  private mapToCoinModel(coinEntity: CoinEntity): CoinEntity {
    const { id, coinName, coinPrice } = coinEntity;
    return { id, coinName, coinPrice };
  }

  async getAllCoins(): Promise<CoinEntity[]> {
    const coinEntities: CoinEntity[] = await this.coinRep.find();
    return coinEntities.map(this.mapToCoinModel);
  }

  async createCoin(coinDto: CoinDto): Promise<CoinEntity> {
    const { coinName, coinPrice } = coinDto;
    const coin: CoinEntity = {
      id: uuid.v4(),
      coinName,
      coinPrice,
    };
    await this.coinRep.save(coin);
    return coin;
  }
}
