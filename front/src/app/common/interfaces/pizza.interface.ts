import { Topping } from "./topping.interface"

export interface Pizza{
  id:number
  name:string
  imageUrl:string
  price:number
  ingredients:string
  toppings:Topping[]
}