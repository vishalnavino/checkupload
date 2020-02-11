import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThymeChartsComponent } from './thyme-charts.component';

describe('ThymeChartsComponent', () => {
  let component: ThymeChartsComponent;
  let fixture: ComponentFixture<ThymeChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThymeChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThymeChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
