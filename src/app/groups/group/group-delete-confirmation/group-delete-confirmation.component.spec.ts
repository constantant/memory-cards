import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDeleteConfirmationComponent } from './group-delete-confirmation.component';

describe('GroupDeleteConfirmationComponent', () => {
  let component: GroupDeleteConfirmationComponent;
  let fixture: ComponentFixture<GroupDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
