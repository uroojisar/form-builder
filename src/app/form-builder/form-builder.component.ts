import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormBuilderComponent {


  items: HTMLElement[] = [];
  draggedItem: EventTarget | null = null;
  
  addItem(newItem: HTMLElement) {
    newItem.addEventListener('mouseenter', this.handleMouseEnter);
    newItem.addEventListener('mouseleave', this.handleMouseLeave);
    this.items.push(newItem);

  }


  // Function to handle mouseenter event
  handleMouseEnter(event: MouseEvent) {
    // Store the item being dragged
    this.draggedItem = event.target;

    // Add a class to highlight the dragged item
    (this.draggedItem as HTMLElement).classList.add('highlight');
  }

  // Function to handle mouseleave event
handleMouseLeave(event: MouseEvent) {

  var list = document.getElementById("sortable-list")!;
  // Check if the draggedItem is not null and the event target is a list item
  if (this.draggedItem && (event.target as HTMLElement).tagName === 'LI') {
    // Get the index of the this.draggedItem
    const draggedIndex = Array.from(this.items).indexOf(this.draggedItem as HTMLElement);

    // Get the index of the current list item
    const currentIndex = Array.from(this.items).indexOf(event.target as HTMLElement);
    // Move the this.draggedItem to its new position
    if (draggedIndex !== currentIndex) {
      if (draggedIndex < currentIndex) {
        list.insertBefore(this.draggedItem as HTMLElement, (event.target as HTMLElement).nextSibling);
      } else {
        list.insertBefore(this.draggedItem as HTMLElement, (event.target as HTMLElement));
      }
    }

    // Remove the highlight class from the dragged item
    (this.draggedItem as HTMLElement).classList.remove('highlight');
    // Reset the draggedItem variable to null
    this.draggedItem = null;
  }
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

  var formGroup = document.createElement("div");     // Create container div for widget
  formGroup.classList.add("form-group");
  formGroup.id = widget + "block" + Date.now();     // Unique ID
  formGroup.draggable = true;

  var div = document.createElement("div");          // Inner div to hold widget's html, Parallel to close button div
  div.classList.add("innerdiv")
  var inputLabel = document.createElement("label");

  if (widget == "text") {

    inputLabel.innerHTML = "Sales script:";             // Input Label
    div.appendChild(inputLabel);
    // Generate the corresponding form input element
    var formInput = document.createElement("input");
    formInput.type = this.getWidgetType(data);
    formInput.name = "input-" + Date.now();
    formInput.id = data + "block";
    formInput.placeholder = "Enter script here..";
    formInput.classList.add("form-input");
    div.appendChild(formInput);


  } else if (widget == "checkbox") {
    
    inputLabel.innerHTML = "Which of the following colors do you like?";        // Multiple Choice Label
    div.appendChild(inputLabel);
    // Generate the corresponding Checkboxes
    for (let i = 0; i < 3; i++) {
      var checkboxDiv = document.createElement("div");
      checkboxDiv.classList.add("checkbox");
      var checkboxInput = document.createElement("input");
      checkboxInput.type = this.getWidgetType(data);
      checkboxInput.id = i + "checkinput-" + Date.now();
      checkboxInput.checked = false;
      checkboxDiv.appendChild(checkboxInput);
      var checkInputLabel = document.createElement("label");
      checkInputLabel.innerHTML = "color_" + i;
      checkboxDiv.appendChild(checkInputLabel);

      div.appendChild(checkboxDiv);
    }
  }

  else if (widget == "email") {
    inputLabel.innerHTML = "Email:";             // Email Label
    div.appendChild(inputLabel);
    // Generate the corresponding email input element
    var formInput = document.createElement("input");
    formInput.type = this.getWidgetType(data);
    formInput.name = "input-" + Date.now();
    formInput.id = data + "block";
    formInput.placeholder = "Johndoe@gmail.com";
    formInput.classList.add("form-input");
    div.appendChild(formInput);


    // *****************************VALIDATE EMAIL INPUT*****************************
    formInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter"){
        event.preventDefault();
        const email = (document.getElementById("emailblock")! as HTMLInputElement).value;

        // Validation and submit logic 
        // if (this.validateEmail(email)) {
        //     // Email is valid, proceed with submission or other logic
        //     console.log("Email is valid: " + email);
        // } else {
        //     // Invalid email, display error or take appropriate action
        //     console.log("Invalid email");
        // }

        // Clear the input field
        (document.getElementById("emailInput")! as HTMLInputElement).value = "";
      }

    });

  }
  else if (widget == "radio") {
    inputLabel.innerHTML = "Select one of the options below:";             // Radio buttons label
    div.appendChild(inputLabel);
    
    for (let i = 0; i < 3; i++) {
    var labelsEnclosingDiv = document.createElement("div");
    labelsEnclosingDiv.classList.add("radiolabelenclosingdiv");
    // Generate the corresponding radio input element
    var radioInput = document.createElement("input");
    radioInput.type = this.getWidgetType(data);
    radioInput.name = "gender";
    radioInput.value = i==0? "male": i==1? "female": "other";
    radioInput.id = data + "block";

    var label = document.createElement("label");
    label.innerHTML = i==0? "Male": i==1? "Female": "Other";
    label.appendChild(radioInput);
    labelsEnclosingDiv.appendChild(label);

    div.appendChild(labelsEnclosingDiv);
    }
  }

  var closebtn = document.createElement("button");          // Close button
  closebtn.classList.add("close");
  closebtn.ariaLabel = "Close";
  // closebtn.addEventListener("click", removeWidget);
  var spanTimes = document.createElement("span");
  spanTimes.innerHTML = "&times;";
  // spanTimes.ariaHidden = true;
  closebtn.appendChild(spanTimes);

  formGroup.appendChild(div);
  formGroup.appendChild(closebtn);

  // Add event listeners for reordering of form widgets when they are created/
  // as soon as they are dropped on the canvas
  // formGroup.addEventListener("dragover", handleDragOver);
  // formGroup.addEventListener("dragstart", handleDragStart);
  // formGroup.addEventListener("dragend", handleDragEnd);
  // formGroup.addEventListener("drop", dropOnCanvas);
  // formGroup.addEventListener("click", openEditTab);

  // document.getElementById("salesform")!.appendChild(formGroup);
  this.addItem(formGroup);
  
}

}

