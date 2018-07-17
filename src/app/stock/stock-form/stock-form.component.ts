import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../stock.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel: FormGroup;

  stock: Stock = new Stock(0, "", 0, 0, "", []);

  categories = ['IT', 'Cloud', 'UI'];

  constructor(
    private routeInfo: ActivatedRoute,
    private stockService: StockService,
    private router: Router,
  ) { }

  ngOnInit() {
    let stockId = this.routeInfo.snapshot.params['id'];

    // 要解决异步的问题，当我调出页面，发出请求时，页面需要的数据还没有回来，如this.stock.name，就会出现undefined的情况.
    // 先把所有值设为空
    let fb = new FormBuilder();
    this.formModel = fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', [Validators.required]],
        desc: [''],
        categories: fb.array([
          new FormControl(false),
          new FormControl(false),
          new FormControl(false)
        ], this.categoriesSelectValidator)
      }
    );

    // 当拿到值了，再用拿到的值重置formModel
    this.stockService.getStock(stockId).subscribe(
      data => {
        this.stock = data;
        this.formModel.reset({
          name: data.name,
          price: data.price,
          desc: data.desc,
          categoreis: [
            data.categories.indexOf(this.categories[0]) != -1,
            data.categories.indexOf(this.categories[1]) != -1,
            data.categories.indexOf(this.categories[2]) != -1,
            
          ]
        })
      }
    );

    
  }

  categoriesSelectValidator(control: FormArray) {
    let valid = false;
    control.controls.forEach(control => {
      if(control.value) {
        valid = true;
      }
    });
    
    return valid ? null : {categoriesLength: true};
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
