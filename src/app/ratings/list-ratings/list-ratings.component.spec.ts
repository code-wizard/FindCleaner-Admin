import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRatingsComponent } from './list-ratings.component';

describe('ListRatingsComponent', () => {
  let component: ListRatingsComponent;
  let fixture: ComponentFixture<ListRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
