import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from './entities/pizza.entity';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class PizzaService {

  constructor(
    @InjectRepository(Pizza)
    private pizzaRepository:Repository<Pizza>
  ){}

  async create(pizza: Partial<Pizza>) {
    const newPizza=this.pizzaRepository.create({...pizza})
    await this.pizzaRepository.save(newPizza).catch((error)=>{
      throw new InternalServerErrorException(`Error creating Pizza \n\n ${error}`)
    })
  }

  findAll() {
    return this.pizzaRepository.find({relations:{toppings:true}})
  }

  findOne(id: number) {
    return this.pizzaRepository.findOneBy({id})
  }

  async update(id: number, updatePizzaDto: UpdatePizzaDto) {    
    const pizza= await this.pizzaRepository.preload({id,...updatePizzaDto})
    await this.pizzaRepository.save(pizza)
  }

  async remove(pizza:Pizza) {
    
    await this.pizzaRepository.remove(pizza)
  }
}
