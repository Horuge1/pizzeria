import {
  TuiDialog,
  tuiDialog,
  TuiDialogContext,
  TuiDialogService,
  TuiError,
} from '@taiga-ui/core';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  TuiAppearance,
  TuiButton,
  TuiDataList,
  TuiDropdown,
  TuiTextfield,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipe,
  TuiFiles,
  TuiInputNumber,
  TuiTabs,
  tuiValidationErrorsProvider,
} from '@taiga-ui/kit';
import { TuiHeader, TuiNavigation } from '@taiga-ui/layout';

import { injectContext } from '@taiga-ui/polymorpheus';
import { Observer, Subscription, tap } from 'rxjs';
import { Pizza } from '../../../common/interfaces/pizza.interface';
import { ToppingListService } from '../../../topping-list/topping-list.service';
import { PizzaListService } from '../../pizza-list.service';
import { AsyncPipe } from '@angular/common';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';

@Component({
  selector: 'app-details-dialog',
  imports: [
    FormsModule,
    AsyncPipe,
    TuiError,
    TuiFieldErrorPipe,
    TuiAppearance,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiHeader,
    TuiNavigation,
    TuiTabs,
    TuiTextfield,
    ReactiveFormsModule,
    TuiInputNumber,
    TuiFiles,
  ],
  templateUrl: './details-dialog.component.html',
  providers: [
    tuiValidationErrorsProvider({
      required: 'This field is required!',
      notUnique: 'Pizza already exists',
    }),
  ],
})
export class DetailsDialogComponent implements OnInit, OnDestroy {
  private toppingListService = inject(ToppingListService);
  private pizzaListService = inject(PizzaListService);
  private readonly dialog = inject(TuiDialogService);
  private fb = inject(FormBuilder);
  private readonly context = injectContext<TuiDialogContext<any, any>>();
  private pizzas = this.pizzaListService.pizzas;
  private sub!: Subscription;
  
  toppings = this.toppingListService.toppings();
  formType!: 'create' | 'edit';
  previewUrl: string | null = null;
  pizzaForm = this.fb.group(
    {
      name: new FormControl('', [
        Validators.required,
        (control): ValidationErrors | null => {
          if (control.value) {
            return this.pizzas().some(
              (p) =>
                (!this.pizza &&
                  p.name.toLowerCase() === control.value.toLowerCase()) ||
                (p.name.toLowerCase() === control.value.toLowerCase() &&
                  this.pizza &&
                  this.pizza.id !== p.id)
            )
              ? { notUnique: { value: control.value } }
              : null;
          }
          return null;
        },
      ]),
      image: new FormControl<File | null>(null, Validators.required),
      price: [0, Validators.required],
      ingredients: ['', Validators.required],
      toppings: this.fb.array(this.toppings.map(() => false)),
    },
    {
      validators: (control) => {
        return control.get('toppings')?.value.some((v: boolean) => v === true)
          ? null
          : { noSelect: 'Pick at least one topping!' };
      },
    }
  );

  async ngOnInit() {
    this.pizzaForm.reset();

    if (this.pizza) {
      this.formType = 'edit';
      let response = await fetch(this.pizza.imageUrl);
      let data = await response.blob();
      let metadata = {
        type: 'image/jpeg',
      };
      this.pizzaForm.setValue({
        name: this.pizza.name,
        image: new File([data], 'test.jpg', metadata),
        price: this.pizza.price,
        ingredients: this.pizza.ingredients,
        toppings: this.toppings.map(({ name }) =>
          this.pizza.toppings.some((e) => e.name === name)
        ),
      });
      this.previewUrl = this.pizza.imageUrl;
    } else {
      this.formType = 'create';
    }

    this.sub = this.image.valueChanges
      .pipe(
        tap((file: File) => {
          if (file) {
            const reader = new FileReader();
            reader.onload = () => (this.previewUrl = reader.result as string);
            reader.readAsDataURL(file);
          }
        })
      )
      .subscribe();
  }

  get pizza(): Pizza {
    return this.context.data;
  }

  get toppingsArray() {
    return this.pizzaForm.get('toppings') as FormArray;
  }
  get image() {
    return this.pizzaForm.get('image') as FormControl;
  }

  async submitForm() {
    tuiMarkControlAsTouchedAndValidate(this.pizzaForm);
    this.pizzaForm.markAsTouched();
    if (this.pizzaForm.valid) {
      const selectedToppings = this.toppings.filter(
        (_: any, index: number) => this.toppingsArray.at(index).value
      );
      const { image, ...rest } = this.pizzaForm.value;
      const imageUrl = await this.pizzaListService.uploadImage(
        image!,
        rest.name!
      );
      const pizza: Partial<Pizza> = {
        name: rest.name!,
        price: rest.price!,
        ingredients: rest.ingredients!,
        imageUrl,
        toppings: selectedToppings,
      };

      if (this.formType === 'create') {
        this.pizzaListService.create(pizza);
      } else if (this.formType === 'edit') {
        this.pizzaListService.update({ ...pizza, id: this.pizza.id });
      }

      this.context.completeWith(null);
    }
  }
  openDeleteDialog(id: number, content: TemplateRef<TuiDialogContext>) {
    this.dialog
      .open<boolean>(content, { dismissible: true })
      .subscribe((value) => {
        if (value) {
          this.pizzaListService.delete(id);
          this.context.completeWith(null);
        }
      });
  }
  confirmDelete(observer: Observer<Boolean>, value: boolean) {
    observer.next(value);
    observer.complete();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
