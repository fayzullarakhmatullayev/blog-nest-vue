import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getPostgresConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  database: configService.get<string>('DB_DATABASE'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
})
