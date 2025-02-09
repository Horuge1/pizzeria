import { Module } from '@nestjs/common';
import { ToppingModule } from './topping/topping.module';
import { PizzaModule } from './pizza/pizza.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true ,load:[TypeOrmConfig]}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      serveStaticOptions:{index:false},
      rootPath: join(__dirname, '..', 'public'),
    }),
    ToppingModule,
    PizzaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
