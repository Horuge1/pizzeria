import { Test, TestingModule } from '@nestjs/testing';
import { PizzaService } from './pizza.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Pizza } from './entities/pizza.entity';
import { ToppingModule } from 'src/topping/topping.module';
import { ToppingService } from 'src/topping/topping.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { Topping } from 'src/topping/entities/topping.entity';
import { PizzaModule } from './pizza.module';

describe('PizzaService', () => {
  let pizzaService: PizzaService;
  let toppingService: ToppingService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ToppingModule,
        PizzaModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5435,
          username: 'postgres',
          password: 'postgres',
          database: 'testdb',
          entities: ['./**/*.entity.ts'],
          synchronize: false,
        }),
      ],
    }).compile();
    const dataSource = moduleRef.get(DataSource);
    await dataSource.createQueryBuilder().delete().from(Pizza).execute();
    await dataSource.createQueryBuilder().delete().from(Topping).execute();
    pizzaService = moduleRef.get<PizzaService>(PizzaService);
    toppingService = moduleRef.get<ToppingService>(ToppingService);
    
    await toppingService.create({ name: 'onion' });
    await toppingService.create({ name: 'bacon' });
    await toppingService.create({ name: 'salami' });
  });

  it('should be defined', () => {
    expect(pizzaService).toBeDefined();
  });
  describe('create()', () => {
    it('should create pizza', async () => {
      const toppings = await toppingService.findAll();
      const pizza = {
        name: 'Salami Pizza',
        imageUrl: 'http://image',
        ingredients:
          'Pomodoro San Marzano, Mozzarella Fior Di Latte, Parmiggiano, Basil.',
        price: 10.99,
        toppings,
      };
      await pizzaService.create(pizza);
      const createdPizza: Pizza = (await pizzaService.findAll())[0];
      expect(createdPizza.name).toBe(pizza.name);
      expect(createdPizza.toppings).toStrictEqual(pizza.toppings);
    });
  }); 
  describe('update()', () => {
    it('should update pizza', async () => {
      const toppings = await toppingService.findAll();
      const newPizza = {
        name: 'Salami Pizza',
        imageUrl: 'http://image',
        ingredients:
          'Pomodoro San Marzano, Mozzarella Fior Di Latte, Parmiggiano, Basil.',
        price: 10.99,
        toppings,
      };
      await pizzaService.create(newPizza);
      const oldPizza = (await pizzaService.findAll())[0];
      const pizza = {
        name: 'Margherita Pizza',
        imageUrl: 'http://image',
        ingredients:
          'Pomodoro San Marzano, Mozzarella Fior Di Latte, Parmiggiano, Basil.',
        price: 10.99,
        toppings: [toppings[0]],
      };
      await pizzaService.update(oldPizza.id, pizza);
      const updatedPizza: Pizza = await pizzaService.findOne(oldPizza.id);
      expect(oldPizza.name).not.toBe(updatedPizza.name);
      expect(pizza.name).toBe(updatedPizza.name);
      expect(oldPizza.toppings).not.toStrictEqual(updatedPizza.toppings);      
      expect(pizza.toppings).toStrictEqual(updatedPizza.toppings);
    });
  });
});
