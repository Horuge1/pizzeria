import { tuiDialog } from '@taiga-ui/core';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  TuiAppearance,
  TuiDataList,
  TuiDropdown,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiTabs } from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader, TuiNavigation } from '@taiga-ui/layout';
import { DetailsDialogComponent } from './components/details-dialog/details-dialog.component';
import { ToppingListService } from '../topping-list/topping-list.service';
import { PizzaListService } from './pizza-list.service';
@Component({
  selector: 'app-pizza-list',
  imports: [
    FormsModule,
    TuiAppearance,
    TuiCardLarge,
    TuiDataList,
    TuiDropdown,
    TuiHeader,
    TuiNavigation,
    TuiTabs,
    TuiTextfield,
    TuiTitle,
    ReactiveFormsModule,
  ],
  templateUrl: './pizza-list.component.html',
})
export class PizzaListComponent {
  private pizzaListService = inject(PizzaListService);
  pizzaList=this.pizzaListService.pizzas
  private readonly dialog = tuiDialog(DetailsDialogComponent, {
    closeable: true,
  });

  showDialog(pizza: any): void {
    this.dialog(pizza).subscribe();
  }
}
