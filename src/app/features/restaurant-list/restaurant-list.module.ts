import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RestaurantListComponent} from "./restaurant-list.component";
import {MenuComponent} from "./menu/menu.component";
import {ReactiveFormsModule} from "@angular/forms";
import {OrderComponent} from "./order/order.component";
import {HeaderModule} from "../../core/header/header.module";

const routes : Routes = [
  {path: "", component: RestaurantListComponent},
  {path: "menu/:id", component: MenuComponent},
  {path: "order/:id", component: OrderComponent}
]


@NgModule({
  declarations: [
    RestaurantListComponent,
    MenuComponent,
    OrderComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        HeaderModule
    ]
})
export class RestaurantListModule { }
