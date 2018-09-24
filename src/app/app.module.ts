import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ChartComponent } from './chart/chart.component';
import { ProductsService } from './services/products.service';
import { SelectionService } from './services/selection.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    FormsModule
  ],
  providers: [
    ProductsService,
    SelectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
