import { IsNotEmpty, IsString } from 'class-validator';

export class CoinDto {
  @IsString()
  @IsNotEmpty()
  coinName: string;

  @IsNotEmpty()
  @IsNotEmpty()
  coinPrice: number;
}
