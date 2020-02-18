import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickNotesComponent } from './sick-notes.component';

describe('SickNotesComponent', () => {
  let component: SickNotesComponent;
  let fixture: ComponentFixture<SickNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
