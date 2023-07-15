import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsToolboxComponent } from './widgets-toolbox.component';

describe('WidgetsToolboxComponent', () => {
  let component: WidgetsToolboxComponent;
  let fixture: ComponentFixture<WidgetsToolboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetsToolboxComponent]
    });
    fixture = TestBed.createComponent(WidgetsToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
