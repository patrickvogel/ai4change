import { Component, OnInit, HostListener } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { SelectionService } from '../services/selection.service';


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

  public stockCodes = [];

  compare(a, b) {
    if (a.name.trim().toUpperCase() < b.name.trim().toUpperCase()) {
      return -1;
    }
    if (a.name.trim().toUpperCase() > b.name.trim().toUpperCase()) {
      return 1;
    }
    return 0;
  }

  constructor(private productService: ProductsService, private selectionService: SelectionService) {
    this.productService.getProducts()
         .subscribe(products => {
            this.tableData = products.sort(this.compare);
            this.dataInit = true;
            this.search();
         });

         this.selectionService.getSelection()
         .subscribe(stockCodes => {
          console.log('neue StockCodes');
            this.stockCodes = stockCodes;
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
    this.selectionService.setSelection(this.selectedStockCodes);
  }

  deselectStockCode(stockcode) {
    this.selectedStockCodes = this.selectedStockCodes.filter(function(e) { return e !== stockcode; });
    this.selectionService.setSelection(this.selectedStockCodes);
  }

  getNameByStockCode(stockcode) {
    return this.tableData.filter(obj => {
      return obj.id === stockcode;
    })[0].name;
  }

}
