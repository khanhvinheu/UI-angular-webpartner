import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AppBlankComponent } from './app-blank/app-blank.component';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerComponent } from './customer/customer.component';
import { DetailsOrderComponent } from './order/details-order/details-order.component';
import { OrderComponent } from './order/order.component';
import { PartnerComponent } from './partner/partner.component';
import { ProductComponent } from './product/product.component';


export const OthersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'blank',
      component: AppBlankComponent,
      data: { title: 'Blank', breadcrumb: 'Blank' }
    },
    {
      path: 'khachhang',
      component: CustomerComponent,
      data: { title: 'Khách Hàng', breadcrumb: 'Khách Hàng' },
      children:[
        {
          path: '', component: CustomerListComponent,
          data: { title: 'Edit', breadcrumb: 'Edit' }
        },
        {
        path: ':id/order', component: OrderComponent,
        data: { title: 'Order', breadcrumb: 'Order' }
        },
        {
          path: ':id/details', component: DetailsOrderComponent,
          data: { title: 'Detail', breadcrumb: 'Detail' }
        }
      ]
    },
    {
      path:'sanpham',
      component: ProductComponent,
      data: {title: 'Sản Phẩm', breadcrumb:'Sản Phẩm'}
    },
    {
      path: 'taikhoan',
      component: AccountComponent,
      data: { title: 'Tài Khoản', breadcrumb: 'Tài Khoản' }
    },
    {
      path: 'partner',
      component: PartnerComponent,
      data: { title: 'Partner', breadcrumb: 'Partner' }
    }
  ]
  }
];