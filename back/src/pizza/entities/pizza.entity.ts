import { Topping } from "src/topping/entities/topping.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('pizzas')
export class Pizza {

  @PrimaryGeneratedColumn()
  id:number

  @Column('text',{unique:true})
  name:string
  @Column('text')
  imageUrl:string
  @Column('text')
  ingredients:string
  @Column('numeric')
  price:number




  @ManyToMany(() => Topping)
    @JoinTable()
  toppings:Topping[]
}
