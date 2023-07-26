import { Component, Input } from '@angular/core';
import { WidgetConfig } from './model';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drop-zone',
  template: `
  <div cdkDropList (cdkDropListDropped)="drop($event)">
  <div *ngFor="let item of items">
  <div class="form-group" id="{{item.name}}block" cdkDrag (click)="openEditTab($event)">
    <div class="innerDiv">
      <label>{{item.templateOptions.label}}</label>:
      <div *ngIf="item.templateOptions.options; else otherWidget">
        <div *ngFor="let option of item.templateOptions.options">
          <input class="form-input" type="{{item.templateOptions.type}}" id="{{item.name}}InputBlock">
          <label for="{{item.templateOptions.options[0].value}}">{{item.templateOptions.options[0].label}}</label><br>
        </div>
      </div>
      <ng-template #otherWidget>
      <input class="form-input" type="{{item.templateOptions.type}}" id="{{item.name}}InputBlock" placeholder="{{item.templateOptions.label}}">
      </ng-template>
      </div>
      <button class="close" aria-label="close">
        <span aria-hidden="true">&times;</span>
      </button>
  </div>
  </div>
  </div>
    `,
    
})
export class DropZoneComponent {

  @Input('item') item : WidgetConfig | { [key: string]: any; } = {};
  @Input('items') items : WidgetConfig[] | any = [];


  // Reordering
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  // Tab 2
  //***************************************************************************** */
  openEditTab(event: Event) {

      // Show the selected tab content
  const selectedTab = document.getElementById("tab2-tab");
  const previousTab = document.getElementById("tab1-tab");
  const selectedTabsContent = document.getElementById("tab2");

  (selectedTab as HTMLElement).click();
  previousTab!.classList.remove("show");
  previousTab!.classList.remove("active");
  selectedTabsContent!.classList.remove("fade");
  selectedTabsContent!.classList.add("show");
  selectedTabsContent!.classList.add("active");
  selectedTabsContent!.style.display = "block";
  document.getElementById("edit_widget_container_dropdown")!.querySelector("input")!.value = (event.currentTarget as HTMLElement).querySelector("label")!.innerHTML;
  // document.getElementById("edit_widget_container_dropdown")!.querySelector("input")!.addEventListener('keypress', function(event) {
  //   if (event.key === 'Enter'){
  //     console.log("Heloo");
  //     (event.currentTarget as HTMLElement).querySelector("label")!.innerHTML = document.getElementById("edit_widget_container_dropdown")!.querySelector("input")!.value; 
    
  //   }
  // });

  var dropdownBtn = document.querySelector(".dropdown-arrow");
  var dropdownContent = document.querySelector(
    ".edit_widget_container_dropdown"
  );  
  dropdownBtn?.addEventListener("click", function () {
    dropdownContent?.classList.toggle("show");
  });
}

}
