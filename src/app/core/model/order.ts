import {Restaurant} from "./restaurant";
import {Dish} from "./dish";

export interface Order {

  id : number
  restaurant : Restaurant
  dishes : Dish[]

}
