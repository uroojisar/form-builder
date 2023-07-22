import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { WidgetConfig, widgetFormInputCheckbox, widgetFormInputEmail, widgetFormInputRadio, widgetFormInputText } from './model';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormBuilderComponent {

  items: WidgetConfig[] = [];
  // draggedItem: EventTarget | null = null;
  
  addItem(newItem: WidgetConfig) {
    
    this.items.push(newItem);

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
  // Skip this handler method if widgets are being reordered on the canvas
  // In this way no widget clone is created
  if (
    (event.target as HTMLElement).classList.contains("form-group") || event.dataTransfer?.getData("widgetID")) {
    console.log("ondrop if")
    // handleWidgetReorder(event);
  } else {
    console.log("ondrop else")
    this.createWidget(event);

  }
  event.stopPropagation();
}

createWidget(event: DragEvent) {
  

  var data = event.dataTransfer?.getData("text")!;
  var widget = this.getWidgetType(data);
  
  if (widget == "text") {
    
    this.addItem(widgetFormInputText);


  } else if (widget == "checkbox") {

    this.addItem(widgetFormInputCheckbox);
  }

  else if (widget == "email") {
    this.addItem(widgetFormInputEmail);


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
  else if (widget == "radio") {
    this.addItem(widgetFormInputRadio);
  }

  // Add event listeners for reordering of form widgets when they are created/
  // as soon as they are dropped on the canvas
  // formGroup.addEventListener("dragover", handleDragOver);
  // formGroup.addEventListener("dragstart", handleDragStart);
  // formGroup.addEventListener("dragend", handleDragEnd);
  // formGroup.addEventListener("drop", dropOnCanvas);
  // formGroup.addEventListener("click", openEditTab);
  
}

}

