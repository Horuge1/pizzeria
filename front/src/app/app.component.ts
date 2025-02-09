import { tuiDialog, TuiRoot } from '@taiga-ui/core';
import { RouterOutlet } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tuiAsPortal, TuiPortals } from '@taiga-ui/cdk';
import {
  TuiAppearance,
  TuiButton,
  TuiDataList,
  TuiDropdown,
  TuiDropdownService,
  TuiIcon,
  TuiTextfield,
} from '@taiga-ui/core';
import {
  TuiFade,
  TuiTabs,
} from '@taiga-ui/kit';
import {
  TuiNavigation,
} from '@taiga-ui/layout';
import { DetailsDialogComponent } from './pizza-list/components/details-dialog/details-dialog.component';
import { ToppingListComponent } from './topping-list/topping-list.component';
import { ToppingListService } from './topping-list/topping-list.service';
import { PizzaListService } from './pizza-list/pizza-list.service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TuiRoot,
    FormsModule,
    TuiAppearance,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiFade,
    TuiIcon,
    TuiNavigation,
    TuiTabs,
    TuiTextfield,
  ],
  templateUrl: './app.component.html',
  providers: [TuiDropdownService, tuiAsPortal(TuiDropdownService)],
})
export class AppComponent extends TuiPortals implements OnInit {
  
  private toppingListService=inject(ToppingListService)
  private pizzaListService=inject(PizzaListService)
  ngOnInit(): void {
    this.toppingListService.findAll()
    this.pizzaListService.findAll()
  }
  private readonly pizzaDialog = tuiDialog(DetailsDialogComponent, {
    closeable: true,
    dismissible: true,
  });
  private readonly toppingDialog = tuiDialog(ToppingListComponent, {
    size:'s',
    closeable: true,
    dismissible: true,
  });
  showDialog(): void {
    this.pizzaDialog().subscribe();
  }
  showToppingsDialog(): void {
    this.toppingDialog().subscribe();
  }
}
