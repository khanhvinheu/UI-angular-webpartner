import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ChartsModule } from "ng2-charts";
import { FileUploadModule } from "ng2-file-upload";
import { SharedModule } from "./../../shared/shared.module";
import { SharedMaterialModule } from "app/shared/shared-material.module";

import { AppBlankComponent } from "./app-blank/app-blank.component";
import { OthersRoutes } from "./others.routing";
import { CustomerComponent } from './customer/customer.component';
import { AccountComponent } from './account/account.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { AccountTabComponent } from './account/account-tab/account-tab.component';
import { AccountAddComponent } from './account/account-add/account-add.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { PartnerComponent } from './partner/partner.component';
import { PartnerAddComponent } from './partner/partner-add/partner-add.component';
import { PartnerEditComponent } from './partner/partner-edit/partner-edit.component';
import { DetailsOrderComponent } from './order/details-order/details-order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
    SharedModule,
    RouterModule.forChild(OthersRoutes)
  ],
  declarations: [
    AppBlankComponent,
    CustomerComponent,
    AccountComponent,
    CustomerEditComponent,
    CustomerListComponent,
    CustomerAddComponent,
    AccountListComponent,
    AccountTabComponent,
    AccountAddComponent,
    OrderComponent,
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    PartnerComponent,
    PartnerAddComponent,
    PartnerEditComponent,
    DetailsOrderComponent
  ]
})
export class OthersModule {}
