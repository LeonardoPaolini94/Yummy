import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Restaurant} from "../../model/restaurant";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http : HttpClient) { }

  getAllRestaurants() : Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>("http://localhost:3000/restaurant")
  }

  postRestaurant(restaurant : Restaurant) : Observable<Restaurant> {
    return this.http.post<Restaurant>("http://localhost:3000/restaurant", restaurant)
  }

  deleteRestaurant(id : number) : Observable<Restaurant> {
    return this.http.delete<Restaurant>("http://localhost:3000/restaurant/" + id)
  }

  getRestaurantById(id : number) : Observable<Restaurant> {
    return this.http.get<Restaurant>("http://localhost:3000/restaurant/" + id)
  }

  updateRestaurant(restaurant : Restaurant) : Observable<Restaurant> {
    return this.http.patch<Restaurant>("http://localhost:3000/restaurant/" + restaurant.id, restaurant)
  }


}
