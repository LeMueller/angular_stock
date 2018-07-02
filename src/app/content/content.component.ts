import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Navigation } from 'selenium-webdriver';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  pageTitle = '';
  pageDesc = '';
  
  // 用Router里的event来获取要跳转的URL，根据url改变这个类的属性
  constructor(public router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event: NavigationEnd) => {
        if(event.url == '/dashboard') {
          this.pageTitle = '首页';
          this.pageDesc = '';
        }else if(event.url.startsWith('/stock')) {
          this.pageTitle = '股票信息管理';
          this.pageDesc = '进行股票信息增删改查';
        }
      });
  }

  ngOnInit() {
  }

}
