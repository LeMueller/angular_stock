import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-manage',
  templateUrl: './stock-manage.component.html',
  styleUrls: ['./stock-manage.component.css']
})
export class StockManageComponent implements OnInit {

  private stocks: Array<Stock>;

  constructor(public router: Router) { }

  ngOnInit() {
    this.stocks = [
      new Stock(1, "First stock", 1.99, 3.5, "This ist the first stock", ['IT', 'Internet']),
      new Stock(2, "Second stock", 1.99, 4.5, "This ist the second stock", ['IT', 'Linux']),
      new Stock(3, "Third stock", 1.99, 2.5, "This ist the third stock", ['IT', 'AI']),
      new Stock(4, "Fourth stock", 1.99, 3, "This ist the fourth stock", ['IT', 'VR']),
      new Stock(5, "Fifth stock", 1.99, 4, "This ist the fifth stock", ['IT', 'AR']),
      new Stock(6, "Sixth stock", 1.99, 5, "This ist the sixtch stock", ['IT', 'Cloud']),
      new Stock(7, "Seventh stock", 1.99, 3.5, "This ist the seventh stock", ['IT', 'Datenbank']),
      new Stock(8, "Eighth stock", 1.99, 3, "This ist the eighth stock", ['IT', 'UI']),
    ];
  }

  create() {
    this.router.navigateByUrl('/stock/0');
  }

  update(stock: Stock) {
    this.router.navigateByUrl(`/stock/${stock.id}`);
  }

}

export class Stock {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {
    
  }
}