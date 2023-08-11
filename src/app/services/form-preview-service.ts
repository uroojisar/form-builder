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
//     fields: FormlyFieldConfig[] = [
//         {
//             name: 'Text',
//             type: 'input',
//             id: '1',
//             key: '1',
//             templateOptions: {
//                 type: 'text',
//                 label: 'Text Label',
//                 placeholder: "Enter your text here...",
//                 required: true,
//   },
//         }
//     ];


    // Also change the template tag of data.fields to fields when executing this sample code
    // form = new FormGroup({});
    // model = { email: 'email@gmail.com' };
    // fields: FormlyFieldConfig[] = [
    //   {
    //     key: 'email',
    //     type: 'input',
    //     templateOptions: {
    //       label: 'Email address',
    //       placeholder: 'Enter email',
    //       required: true,
    //     }
    //   }
    // ];

  }

@Injectable()
export class FormPreviewService {
    constructor(private dialog: MatDialog) {}
  
    openPreviewModal(
      fields: FormlyFieldConfig[]
    ): MatDialogRef<FormPreviewDialog> {
      return this.dialog.open(FormPreviewDialog, { data: { fields } });
    }
  }

@NgModule({
imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forChild(),
],
providers: [FormPreviewService],
declarations: [FormPreviewDialog],
})
export class FormPreviewModule {}

