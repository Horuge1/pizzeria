import { Test, TestingModule } from '@nestjs/testing';
import { ToppingService } from './topping.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Topping } from './entities/topping.entity';
import { ToppingModule } from './topping.module';

describe('ToppingService', () => {
  let service: ToppingService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ToppingModule,
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
    await dataSource.createQueryBuilder().delete().from(Topping).execute();
    service = moduleRef.get(ToppingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create()', () => {
    it('should create topping', async () => {
      const topping={name:'salami'}
      await service.create(topping)
      const newTopping=(await service.findAll())[0]
      
      expect(topping.name).toBe(newTopping.name)
    });
  });
});
