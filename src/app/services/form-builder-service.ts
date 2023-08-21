import { Component, Inject, Injectable, NgModule } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
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
import { Widget } from '../form-builder/model';
import { BrowserModule } from '@angular/platform-browser';



@Component({
    template: `
    <form [formGroup]="form" class="max-height">
      <formly-form
        [form]="form"
        [fields]="data.fields" 
        [model]="model"
        [options]="options"
      ></formly-form>
    </form>
    {{model | json}}
  `,
  styles: ['.max-height { max-height: 90vh; }'],
})

export class FormPreviewDialog {

    listOfWidgets: Widget[] = [];
    model: any = {};

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: { fields: FormlyFieldConfig[] }, private dataService: FormBuilderService
    ) {
      this.dataService.formlyFormOptions$.subscribe(obj => {
        this.options = obj;
        this.options.formState!.mainModel = this.model;

      });
      this.dataService.widgetList$.subscribe(list => {
        this.listOfWidgets = list;
      });
    }
  
    form = new FormGroup({});
    options: FormlyFormOptions = {};
    // initially options obj. was here
    // options = {
    //   formState: {
    //     mainModel: this.model,
    //   },
    // };

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
          hide: false,
          widgetId: '',
          optionSelected: ''
        },
  });
  formlyFormOptions$ = this.formlyFormOptionsSource.asObservable();
  // options = {
  //     formState: {
  //       mainModel: this.model,
  //     },
  //   };


  updateactiveWidgetId(newValue: string) {
    this.activeWidgetIdSource.next(newValue);
  }
  
  updateWidgetList(newWidget: Widget) {
    const currentWidgets = this.widgetListSource.value;
    currentWidgets.push(newWidget);
    this.widgetListSource.next(currentWidgets);
  }

  openPreviewModal(
    fields: FormlyFieldConfig[]
  ): MatDialogRef<FormPreviewDialog> {
    debugger
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
    BrowserModule,
],
providers: [],
declarations: [FormPreviewDialog],
})
export class FormBuilderModule {}

