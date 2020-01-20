import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServicesratedComponent } from './list-servicesrated.component';

describe('ListServicesratedComponent', () => {
  let component: ListServicesratedComponent;
  let fixture: ComponentFixture<ListServicesratedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListServicesratedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServicesratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
