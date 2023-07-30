import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedNotesComponent } from './archived-notes.component';

describe('ArchivedNotesComponent', () => {
  let component: ArchivedNotesComponent;
  let fixture: ComponentFixture<ArchivedNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedNotesComponent]
    });
    fixture = TestBed.createComponent(ArchivedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
