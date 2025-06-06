import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { WidgetsToolboxComponent } from './widgets-toolbox/widgets-toolbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Two way data binding of form widgets
import { DropZoneComponent } from './form-builder/drop-zone.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormlyModule } from '@ngx-formly/core';
import { FormBuilderService } from './services/form-builder-service';
import { MatDialogModule } from '@angular/material/dialog';
import { FieldOptionsComponent } from './field-options/field-options.component';
import { FieldOptionsContentComponent } from './field-options-content/field-options-content.component';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    WidgetsToolboxComponent,
    DropZoneComponent,
    FieldOptionsComponent,
    FieldOptionsContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    FormlyModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,

  ],
  providers: [FormBuilderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
