import { IsString } from "class-validator";

export class CreateToppingDto {

  @IsString()
  name:string
}
