import { Component, Inject, Injectable, NgModule } from '@angular/core';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
  } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { BehaviorSubject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { FieldOptionsContentComponent } from '../field-options-content/field-options-content.component';
import { FieldOptionsComponent } from '../field-options/field-options.component';



@Component({
    template: `
    <form [formGroup]="form" class="max-height">
      <formly-form
        [form]="form"
        [fields]="data.fields" 
        [model]="model"
      ></formly-form>
    </form>
  `,
  styles: ['.max-height { max-height: 90vh; }'],
})

export class FormPreviewDialog {
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: { fields: FormlyFieldConfig[] }
    ) {}
  
    form = new FormGroup({});
    model = {};

  }

  
  // The service will be available application wide
@Injectable({providedIn: 'root',})
export class FormBuilderService {

   // form preview
   constructor(private dialog: MatDialog) {}

  // shared seervice to get selected widget on gear icon
  private activeWidgetIdSource = new BehaviorSubject<string>('Initial Value');
  activeWidgetId$ = this.activeWidgetIdSource.asObservable();

  updateactiveWidgetId(newValue: string) {
    this.activeWidgetIdSource.next(newValue);
  }

  openPreviewModal(
    fields: FormlyFieldConfig[]
  ): MatDialogRef<FormPreviewDialog> {
    return this.dialog.open(FormPreviewDialog, { data: { fields } });
  }

  openWidgetSettingsDialog(componentPortal: ComponentPortal<any>): void {
    this.dialog.open(FieldOptionsContentComponent, {
      width: '400px',
      data: componentPortal,
    });
  }
}

@NgModule({
imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forChild(),
],
providers: [],
declarations: [FormPreviewDialog],
})
export class FormBuilderModule {}

