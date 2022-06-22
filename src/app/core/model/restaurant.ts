import {Dish} from "./dish";

export interface Restaurant {

  id: number,
  restaurantName : string
  address : string
  phoneNumber : number
  menu : Dish[]
}
