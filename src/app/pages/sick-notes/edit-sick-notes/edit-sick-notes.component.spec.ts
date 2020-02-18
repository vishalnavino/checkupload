import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSickNotesComponent } from './edit-sick-notes.component';

describe('EditSickNotesComponent', () => {
  let component: EditSickNotesComponent;
  let fixture: ComponentFixture<EditSickNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSickNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSickNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
