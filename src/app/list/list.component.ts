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
  selectedProducts = [];
  selectedStockCode;

  public stockCodes = [];

  weeks = [];
  weekSelection;
  yearSelection;
  weekSales = [0, 0, 0];

  weekDates = [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()];
  weekNames = ['', '', '', '', '', '', ''];

  compare(a, b) {
    if (a.name.trim().toUpperCase() < b.name.trim().toUpperCase()) {
      return -1;
    }
    if (a.name.trim().toUpperCase() > b.name.trim().toUpperCase()) {
      return 1;
    }
    return 0;
  }

  constructor(
    private productService: ProductsService,
    private selectionService: SelectionService
  ) {
    for (let i = 1; i <= 52; i++) {
      this.weeks.push(i);
    }
    this.initializeDates();

    this.productService.getProducts().subscribe(products => {
      this.tableData = products.sort(this.compare);
      this.dataInit = true;
      this.search();
    });

    this.selectionService.getSelection().subscribe(stockCodes => {
      this.stockCodes = stockCodes;
    });
  }

  ngOnInit() {}

  filterIt(arr, searchKey) {
    const searchArray = searchKey.toUpperCase().split(' ');
    return arr.filter(obj => {
      return Object.keys(obj).some(key => {
        for (const searchTerm of searchArray) {
          if (
            !obj[key]
              .trim()
              .toUpperCase()
              .includes(searchTerm)
          ) {
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

  selectProduct(stockcode) {
    this.selectedStockCode = stockcode;
  }

  deselectProduct(stockcode) {
    this.selectedProducts = this.selectedProducts.filter(function(e) {
      return e.id !== stockcode;
    });
    this.selectedStockCodes = this.selectedStockCodes.filter(function(e) {
      return e !== stockcode;
    });

    this.selectionService.setSelection(this.selectedProducts);
  }

  getNameByStockCode(stockcode) {
    try {
      return this.tableData.filter(obj => {
        return obj.id === stockcode;
      })[0].name;
    } catch {
      return '';
    }
  }

  getWeekNumber = function(date: Date): number {
    const d: any = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  updateWeekSelection() {
    const d = 1 + (this.weekSelection - 1) * 7; 
    this.weekDates[3] = new Date(this.yearSelection, 0, d);

    for (let i = 2; i >= 0; i--) {
      this.weekDates[i] = new Date(this.weekDates[i + 1]);
      this.weekDates[i].setDate(this.weekDates[i].getDate() - 7);
    }

    for (let i = 4; i <= 6; i++) {
      this.weekDates[i] = new Date(this.weekDates[i - 1]);
      this.weekDates[i].setDate(this.weekDates[i].getDate() + 7);
    }

    for(let i = 0; i <= 6; i++) {
      this.weekNames[i] = this.getWeekNumber(this.weekDates[i]) 
                          + '/'
                          + this.weekDates[i].getFullYear().toString().substr(-2);
    }
  }

  clearWeekAmounts() {
    this.weekSales = [0, 0, 0];
  }

  initializeDates() {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    this.weekSelection = this.getWeekNumber(nextWeek);
    this.yearSelection = nextWeek.getFullYear();

    this.updateWeekSelection();
  }

  addProduct() {

    this.selectedProducts.push({
      id: this.selectedStockCode,
      name: this.getNameByStockCode(this.selectedStockCode),
      date: this.weekDates[0],
      amounts: this.weekSales,
      forecastLabels: this.weekNames
    });
    this.selectedStockCodes.push (this.selectedStockCode);

    this.selectionService.setSelection(this.selectedProducts);
    this.clearWeekAmounts();
  }
}
