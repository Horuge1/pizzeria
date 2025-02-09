import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topping } from './entities/topping.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToppingService {

  constructor(
    @InjectRepository(Topping)
    private toppingRepository:Repository<Topping>
  ){}


  async create(createToppingDto: CreateToppingDto) {
    const topping=this.toppingRepository.create({...createToppingDto})
    await this.toppingRepository.insert(topping)
    .catch((error) => {
      throw new InternalServerErrorException(
        `Error creating Topping \n\n ${error}`,
      );
    })
  }

  async findAll() {
    return this.toppingRepository.find()
  }

  async findOne(id: number) {
    return this.toppingRepository.findOneBy({id})
  }

  async update(id: number, updateToppingDto: UpdateToppingDto) {
    const topping=await this.toppingRepository.preload({id,...updateToppingDto})
    await this.toppingRepository.update({id},topping)
  }

  async remove(id: number) {
    const topping= await this.findOne(id)
    await this.toppingRepository.remove(topping)
  }
}
