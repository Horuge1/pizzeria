import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppingListComponent } from './topping-list.component';

describe('ToppingListComponent', () => {
  let component: ToppingListComponent;
  let fixture: ComponentFixture<ToppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToppingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
