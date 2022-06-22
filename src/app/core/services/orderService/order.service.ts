import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }

  postOrder(order : Order) : Observable<Order> {
    return this.http.post<Order>("http://localhost:3000/order", order)
  }

  getAllOrders() : Observable<Order[]> {
    return this.http.get<Order[]>("http://localhost:3000/order")
  }

  deleteOrder(id : number) : Observable<Order> {
    return this.http.delete<Order>("http://localhost:3000/order/" + id)
  }

  getOrderById(id : number) : Observable<Order> {
    return this.http.get<Order>("http://localhost:3000/order/" + id)
  }

  updateOrder(order : Order) : Observable<Order> {
    return this.http.patch<Order>("http://localhost:3000/order/" + order.id, order)
  }
}
