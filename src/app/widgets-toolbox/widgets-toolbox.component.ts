import { Component, Input } from '@angular/core';
import { Widget } from '../form-builder/model';
import { FormBuilder } from '@angular/forms';
import { FormBuilderService } from '../services/form-builder-service';


@Component({
  selector: 'app-widgets-toolbox',
  templateUrl: './widgets-toolbox.component.html',
  styleUrls: ['./widgets-toolbox.component.scss']
})
export class WidgetsToolboxComponent {

  @Input('item') item : Widget | { [key: string]: any; } = {};
  @Input('items') items : Widget[] | any = [];
  selectedValue1: string | null = null;
  selectedValue2: string | null = null;
  secondSelectOptions: { label: string, value: string; }[] = [];
  selectedWidget: Widget | { [key: string]: any; } = {};
  activeWidgetId: string | null = '';


  constructor(private formBuilder: FormBuilder, private dataService: FormBuilderService) {
    this.dataService.activeWidgetId$.subscribe(value => {
      this.activeWidgetId = value;
    });
  }

  // Function to handle when the first select option changes
  onFirstSelectChange() {
    debugger
    this.updateSecondSelectOptions();
  }

  // Function to update the options of the second select based on the selected value of the first select
  updateSecondSelectOptions() {
    
    this.selectedWidget = this.items.find((widget: any) => {
      return widget.id === this.selectedValue1;
    });
    this.secondSelectOptions = this.selectedWidget.templateOptions.options;
    // console.log('ptions, ', this.secondSelectOptions)
    this.selectedValue2 = null; // Reset the value of the second select when the first select changes
  }
  
  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData("text", (event.target as HTMLDivElement).id);
  }
}
