import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadComponent:()=>import('./pizza-list/pizza-list.component').then(c=>c.PizzaListComponent)
  },
];
