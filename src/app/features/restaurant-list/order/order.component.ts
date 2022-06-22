import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from "../../../core/services/restaurantService/restaurant.service";
import {ActivatedRoute} from "@angular/router";
import {Restaurant} from "../../../core/model/restaurant";
import {Subscription} from "rxjs";
import {Order} from "../../../core/model/order";
import {Dish} from "../../../core/model/dish";
import {OrderService} from "../../../core/services/orderService/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  id : any
  restaurant : Restaurant
  getRestaurantByIdSubscription : Subscription
  postOrderSubscription : Subscription
  orderCount : number
  order : Order
  menu : any[] ;
  dishes : Dish[] = []
  tot : number = 0

  constructor(private restaurantService : RestaurantService,
              private orderService : OrderService,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
    params => { this.id = params.get('id')});
    this.getRestaurantById(this.id)
    const order : Order = {restaurant : this.restaurant, id: this.orderCount + 1, dishes:[]}
    this.order = order
  }

  getRestaurantById(id :number){
    this.getRestaurantByIdSubscription = this.restaurantService.getRestaurantById(id).subscribe(
      observer => {this.restaurant = {...observer}},
      error => {console.log("Something went wrong :(")},
      () => {console.log("restaurants found")}
    )
  }

  addDish(dish : Dish) {
    if(!this.dishes.includes(dish)){
      this.dishes.push(dish)
      dish.quantity = dish.quantity + 1
    }else{
      dish.quantity = dish.quantity + 1
    }
  }

  removeDish(dish : Dish) {
    if(this.dishes.includes(dish) && dish.quantity == 1){
      dish.quantity = 0;
      this.dishes.splice(this.dishes.indexOf(dish), 1)
    }else if(this.dishes.includes(dish) && dish.quantity != 1){
      dish.quantity = dish.quantity - 1;
    }
  }

  // addDish(dish: Dish) {
  //   this.dishes.push(dish)
  //   console.log(this.dishes)
  //   dish.quantity = this.dishes.filter(d => d.id == dish.id).length
  // }
  //
  // removeDish(dish: Dish) {
  //   if(this.dishes.length > 1) {
  //     let i = this.dishes.findIndex(di => di.id == dish.id)
  //     this.dishes.splice(i, 1)
  //     dish.quantity = this.dishes.filter(d => d.id == dish.id).length
  //   }else{
  //     this.dishes = []
  //     dish.quantity = 0;
  //   }
  // }

  postOrder() {
    this.order.dishes = [...this.dishes]
    this.postOrderSubscription = this.orderService.postOrder(this.order).subscribe(
      observer => {},
      error => {console.log("Something went wrong :(")},
      () => {console.log("order inserted")}
    )

    this.dishes.forEach(dish => {
      this.tot = this.tot + (dish.dishPrice * dish.quantity)
    })
  }

  ngOnDestroy(): void {
    this.getRestaurantByIdSubscription?.unsubscribe()
    this.postOrderSubscription?.unsubscribe()
  }

}
