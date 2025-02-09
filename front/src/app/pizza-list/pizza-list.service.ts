import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pizza } from '../common/interfaces/pizza.interface';
import { API_URL } from '../common/interfaces/constants/constants';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PizzaListService {
  private http = inject(HttpClient);

  pizzas = signal<Pizza[]>([]);

  async uploadImage(image:File,name:string){    
    const data=new FormData()
    data.append('name',name)
    data.append('file',image)
    const {imageName}= await  lastValueFrom(this.http.post<{imageName:string}>(API_URL + '/upload',data));
    return API_URL.substring(0,API_URL.length-3)+'images/'+imageName
  }


  findAll() {
    this.http.get<Pizza[]>(API_URL + '/pizza').subscribe((pizzas) => {
      this.pizzas.set(pizzas);
    });
  }

  create(pizza: Partial<Pizza>) {
    this.http.post(API_URL + '/pizza', { ...pizza }).subscribe(() => {
      this.findAll();
    });
  }

  update(pizza: Partial<Pizza>) {
    this.http
      .patch(API_URL + '/pizza/' + pizza.id, { ...pizza })
      .subscribe(() => {        
        this.findAll();
      });
  }
  delete(id: number) {
    this.http.delete(API_URL + '/pizza/' + id).subscribe(() => {
      this.findAll();
    });
  }
}
