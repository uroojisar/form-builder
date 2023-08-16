import { Component } from '@angular/core';



@Component({
  selector: 'app-widgets-toolbox',
  templateUrl: './widgets-toolbox.component.html',
  styleUrls: ['./widgets-toolbox.component.scss']
})
export class WidgetsToolboxComponent {
  
  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData("text", (event.target as HTMLDivElement).id);
  }
}
