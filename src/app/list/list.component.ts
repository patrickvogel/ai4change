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

  compare(a, b) {
    if (a.name.trim().toUpperCase() < b.name.trim().toUpperCase()) {
      return -1;
    }
    if (a.name.trim().toUpperCase() > b.name.trim().toUpperCase()) {
      return 1;
    }
    return 0;
  }

  constructor() {
    this.productListService.getProducts()
         .subscribe(products => {
            this.tableData = products.sort(this.compare);
            this.dataInit = true;
            this.search();
         });
  }

  ngOnInit() {
  }

  filterIt(arr, searchKey) {
    const searchArray = searchKey.toUpperCase().split(' ');
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        for (let searchTerm of searchArray){
          if (!obj[key].trim().toUpperCase().includes(searchTerm)){
            return false;
          }
        }
        return true;
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

  getNameByStockCode(stockcode) {
    return this.tableData.filter(obj => {
      return obj.id === stockcode;
    })[0].name;
  }

}
