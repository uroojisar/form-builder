import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentType } from '@angular/cdk/portal'; // Import ComponentType

@Component({
  selector: 'app-field-options-content',
  template: '<ng-container *ngComponentOutlet="componentType"></ng-container>', // Use componentType here
  styleUrls: ['./field-options-content.component.scss'],
})
export class FieldOptionsContentComponent implements OnInit {
  componentType: ComponentType<any>; // Use ComponentType<any> here

  constructor(@Inject(MAT_DIALOG_DATA) private data: ComponentPortal<any>) {
    this.componentType = data.component; // Extract the component type from the ComponentPortal
  }

  ngOnInit(): void {}
}
