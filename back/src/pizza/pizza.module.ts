import { Module } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { PizzaController } from './pizza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pizza } from './entities/pizza.entity';
import { ToppingModule } from 'src/topping/topping.module';

@Module({
  imports:[TypeOrmModule.forFeature([Pizza]),ToppingModule],
  controllers: [PizzaController],
  providers: [PizzaService],
  exports:[PizzaService,TypeOrmModule]
})
export class PizzaModule {}
