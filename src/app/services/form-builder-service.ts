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

export class FormBuilderDialog {
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: { fields: FormlyFieldConfig[] }
    ) {}
  
    form = new FormGroup({});
    model = {};

  }

  
  // The service will be available application wide
  @Injectable({providedIn: 'root',})
export class FormBuilderService {

  // shared seervice to get selected widget on gear icon
  private activeWidgetIdSource = new BehaviorSubject<string>('Initial Value');
  activeWidgetId$ = this.activeWidgetIdSource.asObservable();

  updateactiveWidgetId(newValue: string) {
    this.activeWidgetIdSource.next(newValue);
  }

  // form preview
  constructor(private dialog: MatDialog) {}

  openPreviewModal(
    fields: FormlyFieldConfig[]
  ): MatDialogRef<FormBuilderDialog> {
    return this.dialog.open(FormBuilderDialog, { data: { fields } });
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
declarations: [FormBuilderDialog],
})
export class FormBuilderModule {}

