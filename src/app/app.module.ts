import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { WidgetsToolboxComponent } from './widgets-toolbox/widgets-toolbox.component';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    WidgetsToolboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
