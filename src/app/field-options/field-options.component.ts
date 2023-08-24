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
  selectedLabelId: string | null = null;
  selectedOptionId: string | null = null;
  secondSelectOptions: { label: string, value: string; }[] = [];
  selectedWidget: Widget | { [key: string]: any; } = {};
  activeWidgetId: string = '';
  enableSmartLogic: boolean = false;
  options: FormlyFormOptions = {
    formState: {
      mainModel: {},
      widgetId: '',
      optionSelected: ''
    },
  };
  isShow: boolean | null = null;

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
    this.dataService.isShow$.subscribe(val => {
      this.isShow = val;
    });
  }

  ngOnInit() {
    this.generalSettingsForm = this.formBuilder.group({
      widgetLabel: [this.getWidgetById(this.activeWidgetId)?.props.label], // Initial value of the input
      // widgetLabel: ['', Validators.required] // Required validation
      widgetDesc: [this.getWidgetById(this.activeWidgetId)?.props.description],
    });

    this.generalSettingsForm.get('widgetLabel')?.valueChanges.subscribe(newLabel => {
      const widgetToEdit = this.getWidgetById(this.activeWidgetId);
      if (widgetToEdit) {
        // Make sure to create a copy of the widget object to avoid modifying the source array directly``
        const updatedWidget = {...widgetToEdit, props: {...widgetToEdit.props, label: newLabel}};
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
        const updatedWidget = {...widgetToEdit, props: {...widgetToEdit.props, description: newDesc}};
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

  onSelectShowChange(){
    if (this.isShow !== null) {
      if (this.isShow){
        this.options.formState.isShow = true;
      } else{
        this.options.formState.isShow = false;

      }
    }
    
  }
  // Function to handle when the first select option changes
  onSelectLabelChange() {
    this.updateSecondSelectOptions();
  }

  // Function to update the options of the second select based on the selected value of the first select
  updateSecondSelectOptions() {
    if(this.selectedLabelId != ""){
      this.options.formState.widgetId = this.selectedLabelId;
      this.selectedWidget = this.items.find((widget: any) => {
        return widget.id === this.selectedLabelId;
      });
      this.secondSelectOptions = this.selectedWidget.props.options;
      this.selectedOptionId = null; // Reset the value of the second select when the first select changes
    }
    
  }

  onSelectOptionChange() {
    const sourceWidget = this.getWidgetById(this.activeWidgetId);
    const targetType = this.getWidgetById(this.options.formState?.widgetId)?.type;
    this.options.formState.optionSelected = this.selectedOptionId;    
    if (sourceWidget){
      const updatedWidget = {...sourceWidget, props: {...sourceWidget.props, logic: {...sourceWidget.props['logic'], targetWidgetType: targetType, selectedOption: this.options.formState?.optionSelected}}}
      const index = this.items.findIndex((widget: Widget) => widget.id === this.activeWidgetId);
        if (index !== -1) {
          this.items[index] = updatedWidget;
        }
    }
  }
}
