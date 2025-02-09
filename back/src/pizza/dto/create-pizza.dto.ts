import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { Topping } from "src/topping/entities/topping.entity";

export class CreatePizzaDto {

  @IsString()
  name:string

  @IsString()
  imageUrl:string

  @IsNumber()
  price:number

  @IsArray()
  toppings:Topping[]

}
