import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Topping } from '../common/interfaces/topping.interface';
import { API_URL } from '../common/interfaces/constants/constants';

@Injectable({ providedIn: 'root' })
export class ToppingListService {
  http = inject(HttpClient);

  toppings = signal<Topping[]>([]);
  findAll() {
    this.http.get<Topping[]>(API_URL + '/topping').subscribe((toppings) => {
      this.toppings.set(toppings);
    });
  }

  create(topping: Partial<Topping>) {
    this.http.post(API_URL + '/topping', { ...topping }).subscribe(() => {
      this.findAll();
    });
  }
  update(topping: Partial<Topping>) {
    this.http
      .patch(API_URL + '/topping/' + topping.id, { ...topping })
      .subscribe(() => {
        this.findAll();
      });
  }

  delete(id: number) {
    this.http.delete(API_URL + '/topping/' + id).subscribe(() => {
      this.findAll();
    });
  }
}
