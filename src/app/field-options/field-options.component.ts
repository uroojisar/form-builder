import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Widget } from '../form-builder/model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../services/form-builder-service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-field-options',
  templateUrl: './field-options.component.html',
  styleUrls: ['./field-options.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class FieldOptionsComponent implements OnInit {

  @Input('items') items : Widget[] | any = [];
  selectedValue1: string | null = null;
  selectedValue2: string | null = null;
  secondSelectOptions: { label: string, value: string; }[] = [];
  selectedWidget: Widget | { [key: string]: any; } = {};
  activeWidgetId: string = '';
  enableSmartLogic: boolean = false;
  options: FormlyFormOptions = {
    formState: {
      mainModel: {},
      hide: false,
      widgetId: '',
      optionSelected: ''
    },
  };

  generalSettingsForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private dataService: FormBuilderService) {
    this.dataService.activeWidgetId$.subscribe(value => {
      this.activeWidgetId = value;
    });
    this.dataService.widgetList$.subscribe(value => {
      this.items = value;
    });
    this.dataService.formlyFormOptions$.subscribe(obj => {
      this.options = obj;
    });
  }

  ngOnInit() {
    this.generalSettingsForm = this.formBuilder.group({
      widgetLabel: [''], // Initial value of the input
      // widgetLabel: ['', Validators.required] // Required validation
      widgetDesc: [''],
    });

    this.generalSettingsForm.get('widgetLabel')?.valueChanges.subscribe(newLabel => {
      const widgetToEdit = this.getWidgetById(this.activeWidgetId);
      if (widgetToEdit) {
        // Make sure to create a copy of the widget object to avoid modifying the source array directly``
        const updatedWidget = {...widgetToEdit, templateOptions: {...widgetToEdit.templateOptions, label: newLabel}};
        // Update the specific widget in your array (items) with the modified widgetToEdit
        const index = this.items.findIndex((widget: Widget) => widget.id === this.activeWidgetId);
        if (index !== -1) {
          this.items[index] = updatedWidget;
        }
        // this.dataService.updateWidgetList(this.items); // To test this
      }
    }); 

    this.generalSettingsForm.get('widgetDesc')?.valueChanges.subscribe(newDesc => {
      const widgetToEdit = this.getWidgetById(this.activeWidgetId);
      if (widgetToEdit) {
        // Make sure to create a copy of the widget object to avoid modifying the source array directly``
        const updatedWidget = {...widgetToEdit, templateOptions: {...widgetToEdit.templateOptions, description: newDesc}};
        // Update the specific widget in your array (items) with the modified widgetToEdit
        const index = this.items.findIndex((widget: Widget) => widget.id === this.activeWidgetId);
        if (index !== -1) {
          this.items[index] = updatedWidget;
        }
        // this.dataService.updateWidgetList(this.items); // To test this.. seems it automatically updates a global widget list in service file
      }
    });
  }

  // Get widget obj by id from widgets list
  getWidgetById(id: string): Widget | undefined {
    return this.items.find((widget: Widget) => widget.id === id);
  }

  // Function to handle when the first select option changes
  onFirstSelectChange() {
    this.updateSecondSelectOptions();
  }

  // Function to update the options of the second select based on the selected value of the first select
  updateSecondSelectOptions() {
    this.options.formState.widgetId = this.selectedValue1;
    this.selectedWidget = this.items.find((widget: any) => {
      return widget.id === this.selectedValue1;
    });
    this.secondSelectOptions = this.selectedWidget.templateOptions.options;
    this.selectedValue2 = null; // Reset the value of the second select when the first select changes
  }

  onSecondSelectChange() {
    // const sourceWidget = this.getWidgetById(this.activeWidgetId);
    // const targetWidgetType = this.getWidgetById(this.options.formState?.widgetId)?.type;
    // if (sourceWidget){
    //   sourceWidget.expressions = {
    //     hide: (field: FormlyFieldConfig) => {
    //           var b = field.model.get(targetWidgetType) !== field.options?.formState?.option;
    //           debugger
    //           return b;
    //           // if (field.options?.formState.model.widgetKey) {
    //           //   return field.options?.formState.model.widgetKey.templateOptions.options.option !== field.options?.formState.option
    //           // }
    //           // return true;
            
    //         }, 
    //   }
    // }
    
    
    this.options.formState.optionSelected = this.selectedValue2;    
  }
}
