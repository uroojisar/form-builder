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
      <button class="gearicon" (click)="openWidgetSettings(item.id)">
      <i class="fa fa-cog" aria-hidden="true"></i>
      </button>
      <button class="closebtn" aria-label="close" (click)="removeWidget($event, item.id)">
      <i class="fa fa-times-circle" aria-hidden="true"></i>
      </button>
    </div>
    <div class="innerDiv">
      <label>{{item.props.label}}</label>:
      <div *ngIf="item.props.options; else otherWidget">
        <div *ngFor="let option of item.props.options">
          <input class="form-input" type="{{item.props.type}}" id="{{item.name}}InputBlock" name="{{item.name}}">
          <label for="{{option.value}}">{{option.label}}</label><br>
        </div>
      </div>
      <ng-template #otherWidget>
      <input matInput class="form-control" type="{{item.props.type}}" id="{{item.name}}InputBlock" placeholder="{{item.props.placeholder}}">
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

  openWidgetSettings(widgetId: string): void {
    this.updateactiveWidgetId(widgetId);
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

  removeWidget(event: Event, widgetId: string){
    event.preventDefault();
    const element = document.getElementById(widgetId);
    element!.remove();
    // also remove from list
    this.items.splice(this.items.indexOf(this.items.find((widget: Widget) => widget.id === widgetId)), 1);
    

  }

}

