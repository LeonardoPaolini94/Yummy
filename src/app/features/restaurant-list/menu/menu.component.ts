import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from "../../../core/services/restaurantService/restaurant.service";
import {Restaurant} from "../../../core/model/restaurant";
import {observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Dish} from "../../../core/model/dish";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  id : any
  dish : Dish
  restaurant : Restaurant
  getRestaurantByIdSubscription : Subscription
  updateRestaurantSubscription : Subscription
  addDishForm : FormGroup
  dishCount : number

  constructor(private restaurantService : RestaurantService,
              private activatedRoute : ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => { this.id = params.get('id')});
    this.getRestaurantById(this.id)
    this.addDishForm = new FormGroup({
      dishName : new FormControl(),
      dishPrice : new FormControl(),
      dishInfo : new FormControl()
    })
  }


  getRestaurantById(id :number){
    this.getRestaurantByIdSubscription = this.restaurantService.getRestaurantById(id).subscribe(
      observer => {this.restaurant = observer},
      error => {console.log("Something went wrong :(")},
      () => {console.log("restaurants found")}
    )
  }

  updateRestaurant() {
    this.updateRestaurantSubscription = this.restaurantService.updateRestaurant(this.restaurant).subscribe(
      observer => {this.restaurant = observer},
      error => {console.log("Something went wrong :(")},
      () => {console.log("restaurants upated")}
    )
  }



  onSubmit() {
    this.dish = this.addDishForm.value as Dish
    this.getLastDishId()
    this.dish.id = this.dishCount + 1
    this.dish.quantity = 0;
    this.restaurant.menu?.push(this.dish)
    this.addDishForm.reset()
    this.updateRestaurant()

    this.addDish = false
  }

  getLastDishId() {
    this.dishCount = this.restaurant.menu.length >= 1 ? this.restaurant.menu[this.restaurant.menu.length -1].id : 0
  }



  ngOnDestroy(): void {
    this.getRestaurantByIdSubscription?.unsubscribe()
    this.updateRestaurantSubscription?.unsubscribe()
  }

  addDish : boolean = false

  openAddDishForm() {
    this.addDish = !this.addDish
  }
}
