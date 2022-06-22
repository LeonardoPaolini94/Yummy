import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from "../../core/services/restaurantService/restaurant.service";
import {count, Subscription} from "rxjs";
import {Restaurant} from "../../core/model/restaurant";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent implements OnInit, OnDestroy {

  count : number
  restaurant : Restaurant;
  addForm : FormGroup;
  postRestaurantSubscription : Subscription

  constructor(private restaurantService : RestaurantService) { }


  ngOnInit(): void {
    this.addForm = new FormGroup({
      restaurantName : new FormControl(),
      address : new FormControl(),
      phoneNumber : new FormControl()
      })
  }

  onSubmit() {
    this.restaurant = this.addForm.value
    this.restaurant.id = this.count ++
    this.addForm.reset()
    this.postRestaurant()
  }

  postRestaurant() {
    this.postRestaurantSubscription = this.restaurantService.postRestaurant(this.restaurant).subscribe(
      observer => {},
      error => {console.log("Something went wrong :(")},
      () => {console.log("The restaurant is updated")}
    )
  }

  ngOnDestroy(): void {
    this.postRestaurantSubscription.unsubscribe()
  }
}
