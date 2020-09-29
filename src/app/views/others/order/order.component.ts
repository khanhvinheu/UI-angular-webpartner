import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'app/shared/models/order.module';
import { ConfirmDialogService } from 'app/shared/services/web-partner/confirm-dialog.service';
import { OrderService } from 'app/shared/services/web-partner/order.service';

import { TablesService } from 'app/views/tables/tables.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  subscriptions: Subscription[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  order:Order[]=[];
  displayedColumns: string[] = [];
  dataSource: any;

  constructor(
    private orderService: OrderService ,
    private router: Router, 
    private confirmDialogService: ConfirmDialogService, 
    public dialog: MatDialog,   
    private activateRouteService:ActivatedRoute
    ) { }

  ngOnInit() {
    this.orderService.getAll();
    this.displayedColumns = this.orderService.getDataConf().map((c) => c.prop)
    //this.dataSource = new MatTableDataSource(this.tableService.getAll());
    this.subscriptions.push(
      this.orderService.itemsObs.subscribe(
          data => {
              this.order = data.filter(e=>e.custormerID==this.activateRouteService.params['value'].id);             
              this.dataSource = new MatTableDataSource<Order>(
                  this.order
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
  onDelete(order: Order) {
    console.log(order);
    
    this.confirmDialogService.openDialog().then(result => {
       if (result) {
            this.orderService.delete(order);
       }
    });
  }
  onEdit(item) {
    //alert(data.id)
    //this.router.navigate(['pages/khachhang/', data.id, 'edit']);    
    // this.dialog.open(CustomerEditComponent, {
    //   width: '600px',
    //   data: item
    // });
  }
  onAdd(){
    //this.router.navigate(['pages/khachhang/add']);
    // this.dialog.open(CustomerAddComponent, {
    //       width: '600px'     
    // });
  }
  showOrder(item){
    this.router.navigate(['pages/khachhang/', item.id, 'details']);    
  }


}
