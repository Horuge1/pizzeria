import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('toppings')
export class Topping {

  @PrimaryGeneratedColumn()
  id:number

  @Column('text',{unique:true})
  name:string
}
