import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupGroupComponent } from './popup-group.component';

describe('PopupGroupComponent', () => {
  let component: PopupGroupComponent;
  let fixture: ComponentFixture<PopupGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
