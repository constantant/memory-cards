import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDeleteConfirmationComponent } from './card-delete-confirmation.component';

describe('CardDeleteConfimationComponent', () => {
  let component: CardDeleteConfirmationComponent;
  let fixture: ComponentFixture<CardDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
