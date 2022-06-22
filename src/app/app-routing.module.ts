import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "home", loadChildren: () => import("./features/home/home.module").then(m => m.HomeModule)},
  {path: "restaurant", loadChildren: () => import("./features/restaurant-list/restaurant-list.module").then(m => m.RestaurantListModule)},
  {path: "addrestaurant", loadChildren: () => import("./features/add-restaurant/add-restaurant.module").then(m => m.AddRestaurantModule)},
  {path: "**", redirectTo: "home", pathMatch: "full"},
  {path: "", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
