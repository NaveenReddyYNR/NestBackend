import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { CoinDto } from './coin-dto/create-coin.dto';
import { CoinEntity } from './coin.entity';
import { CoinService } from './coin.service';

@Controller('coin')
// @UseGuards(AuthGuard())
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @Get()
  getCoins(): Promise<CoinEntity[]> {
    try {
      return this.coinService.getAllCoins();
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Post()
  async createCoin(@Body() coinDto: CoinDto): Promise<CoinEntity> {
    try {
      return await this.coinService.createCoin(coinDto);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
