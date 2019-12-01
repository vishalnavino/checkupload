import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInformationsComponent } from './employee-informations.component';

describe('EmployeeInformationsComponent', () => {
  let component: EmployeeInformationsComponent;
  let fixture: ComponentFixture<EmployeeInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
