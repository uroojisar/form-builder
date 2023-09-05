import { Component, Inject, Injectable, NgModule } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
  } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { FieldOptionsContentComponent } from '../field-options-content/field-options-content.component';
import { FieldOptionsComponent } from '../field-options/field-options.component';
import { Widget } from '../form-builder/model';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyMaterialModule } from '@ngx-formly/material';




@Component({
    template: `
    <div class="form-container">
      <h2 class="form-title">Sales Form</h2>
      <hr class="form-hr">
      <form role="form" [formGroup]="form" class="max-height" (ngSubmit)="onSubmit()">
        <formly-form
          [form]="form"
          [fields]="data.fields"
          [model]="model"
          [options]="options"
        ></formly-form>
        <button type="submit" class="form-submit-button">Submit</button>
        <div class="form-data-container">
          <h3 class="form-data-title">Form Data</h3>
          <pre class="form-data-json">{{ model | json }}</pre>
        </div>
      </form>
    </div>

    
  `,
  styles: [ `
 
  .max-height {
    max-height: 80vh; /* Less than a viewport height triggers scrolling */
    overflow-y: auto; /* or overflow-y: scroll; */ 
  }

  /* Styling for the form container */
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Styling for the form title */
  .form-title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
  }
  
  /* Styling for the horizontal rule */
  .form-hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 20px 0;
  }
  
  /* Styling for the form submit button */
  .form-submit-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
  }
  
  /* Styling for the form data container */
  .form-data-container {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Styling for the form data title */
  .form-data-title {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
  }
  
  /* Styling for the form data JSON */
  .form-data-json {
    white-space: pre-wrap;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    color: #333;
  }
  

  `],
})

export class FormPreviewDialog {

    listOfWidgets: Widget[] = [];
    model: any = {
    };
    form = new FormGroup({});
    options: FormlyFormOptions = {
    };

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: { fields: FormlyFieldConfig[] }, private dataService: FormBuilderService
    ) {
      this.dataService.formlyFormOptions$.subscribe(obj => {
        this.options = obj;

      });
      this.dataService.widgetList$.subscribe(list => {
        this.listOfWidgets = list;
      });
    }

    onSubmit() {
      if (this.form.valid) {
        // Handle form submission
        console.log('Form submitted');
      }
    }
  }

  
  // The service will be available application wide
@Injectable({providedIn: 'root',})
export class FormBuilderService {

  // form preview
  constructor(private dialog: MatDialog) {}

  // shared data source to get selected widget Id on clicking the gear icon
  private activeWidgetIdSource = new BehaviorSubject<string>('Initial Value');
  activeWidgetId$ = this.activeWidgetIdSource.asObservable();

  widgetListSource: BehaviorSubject<Widget[]> =  new BehaviorSubject<Widget[]>([]);
  widgetList$ = this.widgetListSource.asObservable(); 

  private formlyFormOptionsSource = new BehaviorSubject<FormlyFormOptions>({
    formState: {
          mainModel: {},
          widgetId: '',
          optionSelected: '',
          isShow: null,
        },
  });
  formlyFormOptions$ = this.formlyFormOptionsSource.asObservable();


  updateactiveWidgetId(newValue: string) {
    this.activeWidgetIdSource.next(newValue);
  }
  
  updateWidgetList(newWidget: Widget) {
    const currentWidgets = this.widgetListSource.value;
    currentWidgets.push(newWidget);
    this.widgetListSource.next(currentWidgets);
  }

  updateFormlyFormOptions(newValue: FormlyFormOptions) {
    this.formlyFormOptionsSource.next(newValue);
  }

  openPreviewModal(fields: FormlyFieldConfig[]): MatDialogRef<FormPreviewDialog> {
    
    return this.dialog.open(FormPreviewDialog, { 
      minWidth: '300px',
      minHeight: '250px',
      data: { fields } 
    });
  }

  openWidgetSettingsDialog(componentPortal: ComponentPortal<any>): void {
    this.dialog.open(FieldOptionsContentComponent, {
      width: '500px',
      data: componentPortal,
    });
  }
}

@NgModule({
imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule.forChild(),
    BrowserModule,
],
providers: [],
declarations: [FormPreviewDialog],
})
export class FormBuilderModule {}

