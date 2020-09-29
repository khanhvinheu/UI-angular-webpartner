import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DetailsOrder } from 'app/shared/models/detai-order.module';
import { SanPham } from 'app/shared/models/sanpham.model';
import { ConfirmDialogService } from 'app/shared/services/web-partner/confirm-dialog.service';
import { DetailsOrderService } from 'app/shared/services/web-partner/order-detail.service';
import { SanPhamService } from 'app/shared/services/web-partner/sanpham.service';
import { TablesService } from 'app/views/tables/tables.service';
import { Subscription } from 'rxjs';
import { ProductAddComponent } from '../../product/product-add/product-add.component';
import { ProductEditComponent } from '../../product/product-edit/product-edit.component';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.scss']
})
export class DetailsOrderComponent implements OnInit {
  subscriptions: Subscription[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  detailsOrder:DetailsOrder[]=[];
  displayedColumns: string[] = [];
  dataSource: any;

  constructor(
    private tableService: TablesService,
    private detailsOrderService:  DetailsOrderService,
    private router: Router, 
    private confirmDialogService: ConfirmDialogService, 
    public dialog: MatDialog,   
    ) { }

  ngOnInit() {
    this.detailsOrderService.getAll();
    this.displayedColumns = this.detailsOrderService.getDataConf().map((c) => c.prop)
    //this.dataSource = new MatTableDataSource(this.tableService.getAll());
    this.subscriptions.push(
      this.detailsOrderService.itemsObs.subscribe(
          data => {
              this.detailsOrder = data;
              console.log(data);
              
              this.dataSource = new MatTableDataSource<SanPham>(
                  this.detailsOrder
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
            this.detailsOrderService.delete(sanpham);
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
