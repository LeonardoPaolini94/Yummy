import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddRestaurantComponent} from "./add-restaurant.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderModule} from "../../core/header/header.module";

const routes : Routes = [
  {path: "", component: AddRestaurantComponent}
]

@NgModule({
  declarations: [
    AddRestaurantComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        HeaderModule
    ]
})
export class AddRestaurantModule { }
