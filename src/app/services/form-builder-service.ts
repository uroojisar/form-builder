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
    <h4>Sales Form</h4><hr>
    <form role="form" [formGroup]="form" class="max-height" (ngSubmit)="onSubmit()">
      <formly-form
        [form]="form"
        [fields]="data.fields" 
        [model]="model"
        [options]="options">
      </formly-form>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <h5> Form data </h5>
    {{model | json}}
    </div>
    
  `,
  styles: [ `
  .form-container {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 2px;
    max-width: 280px;
    margin: 5px;
  }

  .max-height {
    max-height: 80vh; /* Less than a viewport height triggers scrolling */
    overflow-y: auto; /* or overflow-y: scroll; */ 
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

