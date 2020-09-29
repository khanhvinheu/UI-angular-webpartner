import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Partner } from 'app/shared/models/partner';
import { Taikhoan } from 'app/shared/models/taikhoan.model';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { TaikhoanService } from 'app/shared/services/web-partner/account.service';
import { ConfirmDialogService } from 'app/shared/services/web-partner/confirm-dialog.service';
import { LoginService } from 'app/shared/services/web-partner/login.service';
import { PartnerService } from 'app/shared/services/web-partner/partnet.service';
import { Observable, Subscription } from 'rxjs';
import { AccountAddComponent } from '../account-add/account-add.component';

class NodeUser {
  user: Taikhoan;
  isShow: boolean;
  constructor (user: Taikhoan, isshow: boolean) {
      this.user = user;
      this.isShow = isshow
  }
}
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  currentUser: Taikhoan[]=[];
  @Input() idtab: number;
  users: Taikhoan[] = [];
  partner: Partner[] = [];
  subscriptions: Subscription[] = []
  nodeUsers: NodeUser[] = []
  columnsToDisplay = ['id', 'Ten','Partner','Chucvu', 'Email', 'Admin', 'NhanVien', 'Action'];
  dataSource;
  isLoading = false
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor (
      private taikhoanService: TaikhoanService,
      private loginService: JwtAuthService,
      private partnerService: PartnerService,
      public dialog: MatDialog,
      private confirmDialogService: ConfirmDialogService, 
     
  ) { }
  ngOnInit() {
      this.loadData()       
      this.taikhoanService.getAll();
      this.partnerService.getAll();
  }
  loadData() {
      this.isLoading = true;          
      this.subscriptions.push(         
          this.taikhoanService.currentUser.subscribe(data => { 
              this.currentUser=data;
              if (Number.parseInt(this.idtab + '') == 1) {
                  this.users = data.filter(e => {
                      return Number.parseInt(e.quyen + '') === 1
                  })
              } else {
                  this.users = data.filter(e => {
                      return e.quyen == this.idtab && Number.parseInt(e.quyen + '') === 2
                  })
              }              
              this.nodeUsers = []
              this.users.forEach(e => {
                  this.nodeUsers.push(new NodeUser(e, true))
              })
              this.dataSource = new MatTableDataSource<NodeUser>(this.nodeUsers);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.isLoading = false
          }, err => { console.log(err) }).add(() => { }),
          this.partnerService.itemsObs.subscribe(data=>{
            this.partner=data;              
          })
      )
  }
  onChangeQuyen(e: Taikhoan, idquyen: number) {
      e.quyen = idquyen
      var formData = new FormData();
      formData.append('_method', 'put');
      for (var key in e) {
          formData.append(key, e[key]);
      }
      this.subscriptions.push(
          this.taikhoanService.update(formData).subscribe(data => {

          }, err => { console.log(err) })
      )
  }
  onSaveRow(item) {
      var formData = new FormData();
      formData.append('_method', 'put');
      for (var key in item.user) {
          formData.append(key, item.user[key]);
      }
      this.subscriptions.push(
          this.taikhoanService.update(formData).subscribe(data => {
              item.isShow = !item.isShow
          }, err => { console.log(err) })
      )
  }
  onLock(item) {
      if (Number.parseInt(item.user.status) === 1) {
          item.user.status = 0
      }
      else {
          item.user.status = 1
      }
      var formData = new FormData();
      formData.append('_method', 'put');
      for (var key in item.user) {
          formData.append(key, item.user[key]);
      }
      this.subscriptions.push(
          this.taikhoanService.update(formData).subscribe(data => {
          }, err => { console.log(err) })
      )
  }
  ngOnDestroy(): void {
      if (this.subscriptions) {
          this.subscriptions.forEach(e => e.unsubscribe())
      }
  }
  onDelete(account:Taikhoan){
    console.log(account['user']);
    this.confirmDialogService.openDialog().then(result => {
        if (result) {
            this.taikhoanService.delete(account['user']);
        }
    });
  }
  

}
