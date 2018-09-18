import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
