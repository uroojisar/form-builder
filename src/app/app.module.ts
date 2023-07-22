import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { WidgetsToolboxComponent } from './widgets-toolbox/widgets-toolbox.component';
import { FormsModule } from '@angular/forms'; // Two way data binding of form widgets
import { DropZoneComponent } from './form-builder/drop-zone.component';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    WidgetsToolboxComponent,
    DropZoneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
