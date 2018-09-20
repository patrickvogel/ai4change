import { Component, OnInit, HostListener } from '@angular/core';
import { ProductListService } from '../product-list.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public tableData = [];

  searchText: string;
  resultSize = 5;
  filteredSize = 0;
  dataInit = false;
  selectedStockCodes = [];

  productListService = new ProductListService();

  constructor() {
    this.productListService.getProducts()
         .subscribe(products => {
            this.tableData = products;
            this.dataInit = true;
            this.search();
         });
  }

  ngOnInit() {
  }

  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].includes(searchKey);
      });
    });
  }

  search() {
    if (!this.searchText) {
      this.filteredSize = this.tableData.length;
      return this.tableData;
    }
    if (this.searchText) {
      const result = this.filterIt(this.tableData, this.searchText);
      this.filteredSize = result.length;
      return result;
    }
  }

  addResults() {
    this.resultSize += 5;
  }

  removeResults() {
    this.resultSize -= 5;
  }

  selectStockCode(stockcode) {
    this.selectedStockCodes.push(stockcode);
  }

  deselectStockCode(stockcode) {
    this.selectedStockCodes = this.selectedStockCodes.filter(function(e) { return e !== stockcode; });
  }

}
