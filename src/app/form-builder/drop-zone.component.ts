import { Component, Input } from '@angular/core';
import { Widget } from './model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormBuilderService } from '../services/form-builder-service';
import { ComponentPortal } from '@angular/cdk/portal';
import { FieldOptionsComponent } from '../field-options/field-options.component';

@Component({
  selector: 'app-drop-zone',
  template: `
  <div cdkDropList (cdkDropListDropped)="drop($event)">
  <div *ngFor="let item of items">
  <div class="card" id={{item.id}} cdkDrag>
    <div class="card-header">
      <button class="gearicon" (click)="openWidgetSettings()">
      <i class="fa fa-cog" aria-hidden="true"></i>
      </button>
      <button class="closebtn" aria-label="close" (click)="removeWidget($event, item.id)">
      <i class="fa fa-times-circle" aria-hidden="true"></i>
      </button>
    </div>
    <div class="innerDiv">
      <label>{{item.templateOptions.label}}</label>:
      <div *ngIf="item.templateOptions.options; else otherWidget">
        <div *ngFor="let option of item.templateOptions.options">
          <input class="form-input" type="{{item.templateOptions.type}}" id="{{item.name}}InputBlock">
          <label for="{{option.value}}">{{option.label}}</label><br>
        </div>
      </div>
      <ng-template #otherWidget>
      <input matInput class="form-control" type="{{item.templateOptions.type}}" id="{{item.name}}InputBlock" placeholder="{{item.templateOptions.placeholder}}">
      </ng-template>
      </div>
  </div>
  </div>
  </div>
    `,
  styleUrls: ['./drop-zone.component.scss'],

    
})
export class DropZoneComponent {

  @Input('item') item : Widget | { [key: string]: any; } = {};
  @Input('items') items : Widget[] | any = [];
  activeWidgetId: string = '';

  constructor(private dataService: FormBuilderService) {
  }

  openWidgetSettings(): void {
    const componentPortal = new ComponentPortal(FieldOptionsComponent);
    this.dataService.openWidgetSettingsDialog(componentPortal);
  }
  updateactiveWidgetId(widgetId: string) {
    this.dataService.updateactiveWidgetId(widgetId);
  }

  // Reordering
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  changeWidgetLabel(widgetId: string, newLabel: string){
    this.items.forEach((item: { id: string; templateOptions: { label: string; }; }) => {
      debugger
      if (item.id === widgetId){
        item.templateOptions.label = newLabel;
      }
      
    });
    
    }

  removeWidget(event: Event, widgetId: string){
    event.preventDefault();
    const element = document.getElementById(widgetId);
    element!.remove();
  }

  // Tab 2
  //***************************************************************************** */
  openEditTab(event: Event, widgetId: string) {

    this.updateactiveWidgetId(widgetId);
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
  document.getElementById("edit_widget_container_dropdown")!.querySelector("input")!.value = document.getElementById(widgetId)!.querySelector("label")!.innerHTML;
  document.getElementById("edit_widget_container_dropdown")!.querySelector("input")!.addEventListener('keypress', (event) => {
    if (event.key === 'Enter'){
      // change widget label
      this.changeWidgetLabel(widgetId, document.getElementById("edit_widget_container_dropdown")!.querySelector("input")!.value);
    }
  });

  var dropdownBtn = document.querySelector(".dropdown-arrow");
  var dropdownContent = document.querySelector(
    ".edit_widget_container_dropdown"
  );  
  dropdownBtn?.addEventListener("click", function () {
    dropdownContent?.classList.toggle("show");
  });
}

}

