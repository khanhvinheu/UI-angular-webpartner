import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Customer } from 'app/shared/models/customer.model';
import { SanPham } from 'app/shared/models/sanpham.model';
import { ConfirmDialogService } from 'app/shared/services/web-partner/confirm-dialog.service';
import { CustomerService } from 'app/shared/services/web-partner/customer.service';
import { SanPhamService } from 'app/shared/services/web-partner/sanpham.service';
import { TablesService } from 'app/views/tables/tables.service';
import { Subscription } from 'rxjs';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  subscriptions: Subscription[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  sanphams:SanPham[]=[];
  displayedColumns: string[] = [];
  dataSource: any;

  constructor(
    private tableService: TablesService,
    private sanphamService:  SanPhamService,
    private router: Router, 
    private confirmDialogService: ConfirmDialogService, 
    public dialog: MatDialog,   
    ) { }

  ngOnInit() {
    this.sanphamService.getAll();
    this.displayedColumns = this.sanphamService.getDataConf().map((c) => c.prop)
    //this.dataSource = new MatTableDataSource(this.tableService.getAll());
    this.subscriptions.push(
      this.sanphamService.itemsObs.subscribe(
          data => {
              this.sanphams = data;
              console.log(data);
              
              this.dataSource = new MatTableDataSource<SanPham>(
                  this.sanphams
              );
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              //this.isLoading = false;
          },
          () => {}
      )
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onDelete(sanpham: SanPham) {
    console.log(sanpham);
    
    this.confirmDialogService.openDialog().then(result => {
       if (result) {
            this.sanphamService.delete(sanpham);
       }
    });
  }
  onEdit(item) {
    //alert(data.id)
    //this.router.navigate(['pages/khachhang/', data.id, 'edit']);    
    this.dialog.open(ProductEditComponent, {
      width: '600px',
      data: item
    });
  }
  onAdd(){
    //this.router.navigate(['pages/khachhang/add']);
    this.dialog.open(ProductAddComponent, {
          width: '600px'     
    });
  }
  showOrder(item){
    this.router.navigate(['pages/khachhang/', item.id, 'order']);    
  }

}
