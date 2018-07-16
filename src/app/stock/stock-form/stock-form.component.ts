import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../stock.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel: FormGroup;

  stock: Stock;

  categories = ['IT', 'Cloud', 'UI'];

  constructor(
    private routeInfo: ActivatedRoute,
    private stockService: StockService,
    private router: Router,
  ) { }

  ngOnInit() {
    let stockId = this.routeInfo.snapshot.params['id'];
    this.stock = this.stockService.getStock(stockId);

    let fb = new FormBuilder();
    this.formModel = fb.group(
      {
        name: [this.stock.name, [Validators.required, Validators.minLength(3)]],
        price: [this.stock.price, [Validators.required]],
        desc: [this.stock.desc],
        categories: fb.array([
          new FormControl(this.stock.categories.indexOf(this.categories[0]) !== -1),
          new FormControl(this.stock.categories.indexOf(this.categories[1]) !== -1),
          new FormControl(this.stock.categories.indexOf(this.categories[2]) !== -1)
        ])
      }
    );
  }

  cancle() {
    this.router.navigateByUrl('/stock');
  }

  save() {
    // console.log(this.stock.rating);

    let englishCategories = [];
    let index = 0;
    for(let i = 0; i < 3; i++) {
      if(this.formModel.value.categories[i]) {
        englishCategories[index++] = this.categories[i];
      }
    }
    this.formModel.value.categories = englishCategories;

    this.formModel.value.rating = this.stock.rating;

    console.log('formModel', this.formModel.value);
    
    // this.router.navigateByUrl('/stock');
  }

}
