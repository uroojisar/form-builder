import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Widget } from '../form-builder/model';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormBuilderService } from '../services/form-builder-service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FieldOptionsContentComponent } from '../field-options-content/field-options-content.component';

@Component({
  selector: 'app-field-options',
  templateUrl: './field-options.component.html',
  styleUrls: ['./field-options.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class FieldOptionsComponent implements OnInit {

  @Input('items') items : Widget[] | any = [];
  secondSelectOptions: { label: string, value: string; }[] = [];
  // widget selected for smart logic/ radio widget for now
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

  // Widget settings form
  generalSettingsForm: FormGroup = new FormGroup({});
  updatedWidget: Widget | { [key: string]: any; } = {};
  updatedOptions: FormlyFormOptions = {};
  activeWidget: Widget | { [key: string]: any; } = {};
  activeWidgetOptions: any[] = [];



// Subscribe to all global data here to see updated data
  constructor(private formBuilder: FormBuilder, private dataService: FormBuilderService, public dialogRef: MatDialogRef<FieldOptionsContentComponent>) {
    this.dataService.activeWidgetId$.subscribe(value => {
      this.activeWidgetId = value;
    });
    this.dataService.widgetList$.subscribe(value => {
      this.items = value;
    });
    this.dataService.formlyFormOptions$.subscribe(obj => {
      this.options = obj;
    });
    this.activeWidget = this.getWidgetById(this.activeWidgetId) as Widget;
    this.activeWidgetOptions = this.activeWidget.props.options as [];
  }

  ngOnInit() {
    
    // initialize widget settings form
    this.generalSettingsForm = this.formBuilder.group({
      widgetLabel: [this.getWidgetById(this.activeWidgetId)?.props.label], // Initial value of the input
      widgetDesc: [this.getWidgetById(this.activeWidgetId)?.props.description],
      enableSmartLogic: [false],
      isShow: [null],
      selectedLabelId: [null],
      selectedOptionValue: [null],
    });
    let i= 0;
    if (this.activeWidgetOptions){
      for (const option of this.activeWidgetOptions) {
        this.generalSettingsForm.addControl('option_' + i, this.formBuilder.control(''));
        i++;
      }  
    }

    // Added validators to isShow (Show/ Hide field) dynamically
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
  }
  // Function to handle when the first select option changes
  onSelectLabelChange() {
    this.updateSecondSelectOptions();
  }

  // Function to update the options of the second select based on the selected value of the first select
  updateSecondSelectOptions() {
    if(this.generalSettingsForm.get('selectedLabelId')?.value !== null){

      this.selectedWidget = this.items.find((widget: any) => {
        return widget.id === this.generalSettingsForm.get('selectedLabelId')?.value;
      });
      this.secondSelectOptions = this.selectedWidget.props.options;
      // this.generalSettingsForm.get('selectedLabelId')?.setValue(null);  // Reset the value of the second select when the first select changes
    }
    
  }

  onSelectOptionChange() {
   
  }

  onSubmit() {
    if (this.generalSettingsForm.valid) {
      // Form is valid, perform actions here
      const formData = this.generalSettingsForm.value;
      console.log('Form is valid. Submitting...', formData);

      this.updatedOptions = {...this.updatedOptions, formState: {...this.updatedOptions.formState, isShow:  formData.isShow, widgetId: formData.selectedLabelId, optionSelected: formData.selectedOptionValue}};

      const sourceWidget = this.getWidgetById(this.activeWidgetId);
      const targetWidgetId = formData.selectedLabelId;
      const selectedOptionIndex = this.secondSelectOptions.findIndex((option: any) => option.value == formData.selectedOptionValue);

      if (sourceWidget){
        
        this.updatedWidget = {...sourceWidget, props: {...sourceWidget.props, label: formData.widgetLabel, description: formData.widgetDesc, logic: {...sourceWidget.props['logic'], targetWidgetId: targetWidgetId, selectedOptionIndex: selectedOptionIndex, selectedOption: formData.selectedOptionValue}}}
      
      }
      let optionsData: { label: string; value: number }[] =[];
      if (this.activeWidgetOptions){
            // Deep cloning the object with JSON.parse(JSON.stringify())
            optionsData = JSON.parse(JSON.stringify(this.activeWidgetOptions));

            if (sourceWidget){
            if (this.activeWidgetOptions){
              for (let i = 0; i < this.activeWidgetOptions.length; i++) {
                optionsData[i].label = formData[`option_${i}`] !== ''? formData[`option_${i}`] : this.activeWidgetOptions[i].label;
                optionsData[i].value = this.activeWidgetOptions[i].value;
            }
            
            }
            this.updatedWidget = {...this.updatedWidget, props: {...this.updatedWidget.props, options: optionsData}}

            
          }
      }

      
  // Widget updated in the service
    const index = this.items.findIndex((widget: Widget) => widget.id === this.activeWidgetId);
      if (index !== -1) {
        this.items[index] = this.updatedWidget;
      }
      
    // options updated in service
    this.dataService.updateFormlyFormOptions(this.updatedOptions);

    } else {
      console.log('Form is not valid.');
    }
  // Close the dialog
  this.dialogRef.close();
}
  
}

