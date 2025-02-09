import { Component, inject, signal, TemplateRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TuiTable } from '@taiga-ui/addon-table';
import {
  TuiButton,
  TuiDialogContext,
  TuiDialogService,
  TuiDropdown,
  TuiHint,
  TuiLabel,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import {
  TuiFieldErrorContentPipe,
  TuiItemsWithMore,
  TuiStatus,
  tuiValidationErrorsProvider,
} from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';
import { ToppingListService } from './topping-list.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-topping-list',
  imports: [
    FormsModule,
    TuiHint,
    TuiFieldErrorContentPipe,
    TuiButton,
    TuiCell,
    TuiDropdown,
    TuiItemsWithMore,
    TuiStatus,
    TuiTable,
    TuiTitle,
    TuiTextfield,
    TuiLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './topping-list.component.html',
  styles: `
    .small-grid{
      display: grid;
      grid-template-columns: auto auto;
      column-gap: 10px;
    }
  `,
  providers: [
    tuiValidationErrorsProvider({
      required: 'This field is required!',
      notUnique: 'Topping already exists',
    }),
  ],
})
export class ToppingListComponent {
  private toppingListService = inject(ToppingListService);
  private readonly dialog = inject(TuiDialogService);

  columns = ['Name', 'Options'];
  toppings = this.toppingListService.toppings;

  showCreate = signal(false);
  showEdit = signal(false);
  elementToEdit = signal(0);

  createForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      (control): ValidationErrors | null => {
        if (control.value) {
          return this.toppings().some(
            (t) => t.name.toLowerCase() === control.value.toLowerCase()
          )
            ? { notUnique: { value: control.value } }
            : null;
        }
        return null;
      },
    ]),
  });
  updateForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      (control): ValidationErrors | null => {
        if (control.value) {
          return this.toppings().some(
            (t) =>
              t.name.toLowerCase() === control.value.toLowerCase() &&
              this.elementToEdit() + 1 !== t.id
          )
            ? { notUnique: { value: control.value } }
            : null;
        }
        return null;
      },
    ]),
  });
  get name() {
    return this.createForm.get('name');
  }

  showCreateForm() {
    this.showCreate.set(true);
  }
  dismissCreateForm() {
    this.showCreate.set(false);
    this.createForm.reset();
  }
  showEditForm(id: number) {
    this.showEdit.set(true);
    this.elementToEdit.set(id);
    this.updateForm.setValue({ name: this.toppings()[id].name });
  }
  dismissUpdateForm() {
    this.showEdit.set(false);
    this.updateForm.reset();
  }
  create() {
    if (this.createForm.valid) {
      this.toppingListService.create({ name: this.createForm.value.name! });
      this.dismissCreateForm();
      this.createForm.reset();
    }
  }
  update(id: number) {
    if (this.updateForm.valid) {
      this.toppingListService.update({ id, name: this.updateForm.value.name! });
      this.showEdit.set(false);
      this.updateForm.reset();
    }
  }
  delete(id: number) {
    this.toppingListService.delete(id);
    this.showEdit.set(false);
  }

  openDeleteDialog(id: number, content: TemplateRef<TuiDialogContext>) {
    this.dialog
      .open<boolean>(content, { dismissible: true })
      .subscribe((value) => {
        if (value) {
          this.delete(id);
        }
      });
  }
  confirmDelete(observer: Observer<Boolean>, value: boolean) {
    observer.next(value);
    observer.complete();
  }
  originalValue() {
    return (
      this.updateForm.controls.name.value ===
      this.toppings()[this.elementToEdit()].name
    );
  }
}
