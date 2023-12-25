import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ibba-dev-1.cb5hwvdvchhy.ap-south-1.rds.amazonaws.com',
  port: 5432,
  username: 'naveen_write_user',
  password: 'naveen123',
  database: 'naveen_nest_js',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
