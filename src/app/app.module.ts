import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { StockManageComponent } from './stock/stock-manage/stock-manage.component';
import { StarsComponent } from './stars/stars.component';
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockFormComponent } from './stock/stock-form/stock-form.component';
import { StockService } from './stock/stock.service';
import { StockFilterPipe } from './stock/stock-filter.pipe';
import { HttpModule } from '@angular/http';
import { SocketService } from './header/socket.service';

// 加入路由
const routeConfig: Routes = [
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'stock', component: StockManageComponent},
  {path: 'stock/:id', component: StockFormComponent},
]

@NgModule({
  // 声明了那些组件
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    StockManageComponent,
    DashboardComponent,
    StockFormComponent,
    StockFilterPipe,
    StarsComponent,
  ],
  // 引入了哪些组件
  imports: [
    BrowserModule,
    // FormsModule 是 ReactiveFormsModule 的前提
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig),
  ],
  providers: [
    StockService,
    SocketService
  ],
  // 模块入口组件
  bootstrap: [AppComponent]
})
export class AppModule { }
