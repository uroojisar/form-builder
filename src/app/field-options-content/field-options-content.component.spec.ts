import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldOptionsContentComponent } from './field-options-content.component';

describe('FieldOptionsContentComponent', () => {
  let component: FieldOptionsContentComponent;
  let fixture: ComponentFixture<FieldOptionsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldOptionsContentComponent]
    });
    fixture = TestBed.createComponent(FieldOptionsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
