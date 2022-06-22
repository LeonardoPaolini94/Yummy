import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from "../../core/services/restaurantService/restaurant.service";
import {Subscription} from "rxjs";
import {Restaurant} from "../../core/model/restaurant";

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit, OnDestroy{

  restaurantList : Restaurant[];
  getRestaurantSubscription : Subscription;
  deleteRestaurantSubscription : Subscription

  constructor(private restaurantService : RestaurantService) { }

  ngOnInit(): void {
    this.getAllRestaurants()
  }

  getAllRestaurants() {
    this.getRestaurantSubscription = this.restaurantService.getAllRestaurants().subscribe(
      observer => {this.restaurantList = [...observer]},
      error => {console.log("Something went wrong :(")},
      () => {console.log("restaurants found")}
    )
  }

  deleteRestaurant(id  : number) {
    this.deleteRestaurantSubscription = this.restaurantService.deleteRestaurant(id).subscribe(
      observer => {this.getAllRestaurants()},
      error => {console.log("Something went wrong :(")},
      () => {console.log("restaurants deleted")}
    )
  }

  ngOnDestroy(): void {
    this.getRestaurantSubscription?.unsubscribe()
    this.deleteRestaurantSubscription?.unsubscribe()
  }

}
