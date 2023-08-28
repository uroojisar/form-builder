import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Widget } from '../form-builder/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  secondSelectOptions: { label: string, value: string; }[] = [];
  selectedWidget: Widget | { [key: string]: any; } = {};
  activeWidgetId: string = '';
  options: FormlyFormOptions = {
    formState: {
      mainModel: {},
      widgetId: '',
      optionSelected: '',
      isShow: null,
    },
  };

  generalSettingsForm: FormGroup = new FormGroup({});
  updatedWidget: Widget | { [key: string]: any; } = {};
  updatedOptions: FormlyFormOptions = {};


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
      widgetLabel: [this.getWidgetById(this.activeWidgetId)?.props.label], // Initial value of the input
      widgetDesc: [this.getWidgetById(this.activeWidgetId)?.props.description],
      enableSmartLogic: [false],
      isShow: [this.options.formState?.isShow],
      selectedLabelId: [this.getWidgetById(this.options.formState?.widgetId)?.id , null ],
      selectedOptionValue: [this.options.formState?.optionSelected],

    });

    this.generalSettingsForm.get('widgetLabel')?.valueChanges.subscribe(newLabel => {
      const widgetToEdit = this.getWidgetById(this.activeWidgetId);
      if (widgetToEdit) {
        // Make sure to create a copy of the widget object to avoid modifying the source array directly
        this.updatedWidget = {...widgetToEdit, props: {...widgetToEdit.props, label: newLabel}};
        
        // this.dataService.updateWidgetList(this.items); // To test this
      }
    }); 

    this.generalSettingsForm.get('widgetDesc')?.valueChanges.subscribe(newDesc => {
      const widgetToEdit = this.getWidgetById(this.activeWidgetId);
      if (widgetToEdit) {
        // Make sure to create a copy of the widget object to avoid modifying the source array directly``
        this.updatedWidget = {...this.updatedWidget, props: {...this.updatedWidget.props, description: newDesc}};
        // this.dataService.updateWidgetList(this.items); // To test this.. seems it automatically updates a global widget list in service file
      }
    });

    // Added validators to isShow dynamically
    this.generalSettingsForm.get('selectedLabelId')?.valueChanges.subscribe(selectedValue => {
      if (selectedValue !== null) {
        // Add validators to isShow
        this.generalSettingsForm.get('isShow')?.setValidators([Validators.required]);
      } else {

        // Clear validators from isShow
        this.generalSettingsForm.get('isShow')?.clearValidators();
      }
      // Update the validity of isShow
      this.generalSettingsForm.get('isShow')?.updateValueAndValidity();
    });

  }

  // Get widget obj by id from widgets list
  getWidgetById(id: string): Widget | undefined {
    return this.items.find((widget: Widget) => widget.id === id);
  }

  onSelectShowChange(){
    if (this.generalSettingsForm.get('isShow')?.value !== null) {
      if (this.generalSettingsForm.get('isShow')?.value){
        this.updatedOptions = {...this.options, formState: {...this.options.formState, isShow:  this.generalSettingsForm.get('isShow')?.value}};
      }
    }
    
  }
  // Function to handle when the first select option changes
  onSelectLabelChange() {
    this.updateSecondSelectOptions();
  }

  // Function to update the options of the second select based on the selected value of the first select
  updateSecondSelectOptions() {
    if(this.generalSettingsForm.get('selectedLabelId')?.value !== null){

      this.updatedOptions = {...this.updatedOptions, formState: {...this.updatedOptions.formState, widgetId:  this.generalSettingsForm.get('selectedLabelId')?.value}};
      this.selectedWidget = this.items.find((widget: any) => {
        return widget.id === this.generalSettingsForm.get('selectedLabelId')?.value;
      });
      this.secondSelectOptions = this.selectedWidget.props.options;
      // this.generalSettingsForm.get('selectedLabelId')?.setValue(null);  // Reset the value of the second select when the first select changes
    }
    
  }

  onSelectOptionChange() {

    

    this.updatedOptions = {...this.updatedOptions, formState: {...this.updatedOptions.formState, optionSelected:  this.generalSettingsForm.get('selectedOptionValue')?.value}}

  }

  onSubmit() {
    if (this.generalSettingsForm.valid) {
      // Form is valid, perform actions here
      console.log('Form is valid. Submitting...');
      const index = this.items.findIndex((widget: Widget) => widget.id === this.activeWidgetId);
      if (index !== -1) {
        this.items[index] = this.updatedWidget;
      }
      // options updated in service
      this.dataService.updateFormlyFormOptions(this.updatedOptions);

      const sourceWidget = this.getWidgetById(this.activeWidgetId);
      const targetType = this.getWidgetById(this.options.formState?.widgetId)?.type;  
      const selectedOptionIndex = this.secondSelectOptions.findIndex((option: any) => option.value == this.options.formState?.optionSelected);
      
      if (sourceWidget){
        const updatedWidget = {...sourceWidget, props: {...sourceWidget.props, logic: {...sourceWidget.props['logic'], targetWidgetType: targetType, selectedOptionIndex: selectedOptionIndex, selectedOption: this.options.formState?.optionSelected,}}}
        debugger
        const index = this.items.findIndex((widget: Widget) => widget.id === this.activeWidgetId);
          if (index !== -1) {
            this.items[index] = updatedWidget;
          }
      }

    } else {
      console.log('Form is not valid.');
    }
  }
}

