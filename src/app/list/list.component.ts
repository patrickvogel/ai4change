import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../product-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public products = [];

  productListService = new ProductListService();

  constructor() {
    this.productListService.getProducts()
         .subscribe(products => {
            this.products = products;
         });
  }

  ngOnInit() {
  }

}
