import * as fs from 'fs';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
} from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from './entities/pizza.entity';
import { ToppingService } from 'src/topping/topping.service';
import { join } from 'path';

@Controller('pizza')
export class PizzaController {
  constructor(
    private readonly pizzaService: PizzaService,
    private readonly toppingService: ToppingService,
  ) {}

  @Post()
  async create(@Body() createPizzaDto: CreatePizzaDto) {
    return this.pizzaService.create(createPizzaDto);
  }

  @Get()
  findAll() {
    return this.pizzaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pizzaService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ) {
    const pizza = await this.pizzaService.findOne(+id);
    if (pizza.imageUrl !== updatePizzaDto.imageUrl) {
      fs.unlink(
        join(__dirname, '../..', 'public/images') +
          pizza.imageUrl.split('images')[1],
        (err) => {
          if (err) throw new InternalServerErrorException(err);
        },
      );
    }

    return this.pizzaService.update(+id, updatePizzaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const pizza = await this.pizzaService.findOne(+id);
    return this.pizzaService.remove(pizza).then(() => {
      fs.unlink(
        join(__dirname, '../..', 'public/images') +
          pizza.imageUrl.split('images')[1],
        (err) => {
          if (err) throw new InternalServerErrorException(err);
        },
      );
    });
  }
}
