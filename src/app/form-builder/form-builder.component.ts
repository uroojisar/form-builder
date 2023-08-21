import { Component, ViewEncapsulation } from '@angular/core';
import { Widget, widgetFormInputCheckbox, widgetFormInputEmail, widgetFormInputRadio, widgetFormInputText } from './model';
import { FormBuilderService } from '../services/form-builder-service';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormBuilderComponent {

  items: Widget[] = [];
  
  constructor(private dataService: FormBuilderService) {
    this.dataService.widgetList$.subscribe(value => {
      this.items = value;
    });
  }

  addItem(newItem: Widget) {
    this.dataService.updateWidgetList({...newItem});
  }


  // Email validation function
  validateEmail(email: string) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Map widget IDs to form input types
  getWidgetType(widgetId: string) {
    
    switch (widgetId) {
      case "freetext":
        return "text";
      case "multichoice":
        return "checkbox";
      case "email":
        return "email";
      case "radio":
        return "radio";
      // Add more cases for additional widgets
      default:
        return "text";
    }
  }
  onDragStart(event: DragEvent) {
    console.log("dragstrat")
    event.dataTransfer!.setData('text/plain', (event.currentTarget as HTMLDivElement).id);
  }
  
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // DROP EVENT
  onDrop(event: DragEvent)  {

  event.preventDefault();
  this.createWidget(event);
  event.stopPropagation();
}

createWidget(event: DragEvent) {
  

  var data = event.dataTransfer?.getData("text")!;
  var widgetType = this.getWidgetType(data);
  var widgetId = Date.now().toString();
  var key = widgetId;
  const widget: Widget | any = {id: '', type: { }, isConditional: false};

  if (widgetType == "text") {
    widget.id = widgetId;
    widget.key = widgetType;
    widget.name = widgetFormInputText.name;
    widget.type = widgetFormInputText.type;
    widget.templateOptions = widgetFormInputText.templateOptions;
    widget.expressions = widgetFormInputText.expressions;
    this.addItem(widget);


  } else if (widgetType == "checkbox") {
    widget.id = widgetId;
    widget.key = widgetType;
    widget.name = widgetFormInputCheckbox.name;
    widget.type = widgetFormInputCheckbox.type;
    widget.templateOptions = widgetFormInputCheckbox.templateOptions;
    this.addItem(widget);
  }

  else if (widgetType == "email") {
    widget.id = widgetId;
    widget.key = widgetType;
    widget.name = widgetFormInputEmail.name;
    widget.type = widgetFormInputEmail.type;
    widget.templateOptions = widgetFormInputEmail.templateOptions;
    this.addItem(widget);


    // // // *****************************VALIDATE EMAIL INPUT*****************************
    // // formInput.addEventListener("keypress", function(event) {
    // //   if (event.key === "Enter"){
    // //     event.preventDefault();
    // //     const email = (document.getElementById("emailblock")! as HTMLInputElement).value;

    // //     // Validation and submit logic 
    // //     // if (this.validateEmail(email)) {
    // //     //     // Email is valid, proceed with submission or other logic
    // //     //     console.log("Email is valid: " + email);
    // //     // } else {
    // //     //     // Invalid email, display error or take appropriate action
    // //     //     console.log("Invalid email");
    // //     // }

    // //     // Clear the input field
    // //     (document.getElementById("emailInput")! as HTMLInputElement).value = "";
    // //   }

    // });

  }
  else if (widgetType == "radio") {
    widget.id = widgetId;
    widget.key = widgetType;
    widget.name = widgetFormInputRadio.name;
    widget.type = widgetFormInputRadio.type;
    widget.templateOptions = widgetFormInputRadio.templateOptions;
    this.addItem(widget);
  }
  
}

// Show form preview
showPreview(fields: FormlyFieldConfig[]) {
  this.dataService.openPreviewModal(fields);
}

}

