import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coins')
export class CoinEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  coinName: string;

  @Column()
  coinPrice: number;
}
