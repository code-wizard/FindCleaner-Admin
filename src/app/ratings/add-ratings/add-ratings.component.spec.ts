import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRatingsComponent } from './add-ratings.component';

describe('AddRatingsComponent', () => {
  let component: AddRatingsComponent;
  let fixture: ComponentFixture<AddRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
