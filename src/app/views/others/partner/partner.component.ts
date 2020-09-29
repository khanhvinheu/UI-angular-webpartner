import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Partner } from 'app/shared/models/partner';
import { ConfirmDialogService } from 'app/shared/services/web-partner/confirm-dialog.service';
import { PartnerService } from 'app/shared/services/web-partner/partnet.service';
import { TablesService } from 'app/views/tables/tables.service';
import { Subscription } from 'rxjs';
import { PartnerAddComponent } from './partner-add/partner-add.component';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';


@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {

  subscriptions: Subscription[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  partner:Partner[]=[];
  displayedColumns: string[] = [];
  dataSource: any;

  constructor(
    private tableService: TablesService,
    private partnerService: PartnerService ,
    private router: Router, 
    private confirmDialogService: ConfirmDialogService, 
    public dialog: MatDialog,   
    ) { }

  ngOnInit() {
    this.partnerService.getAll();
    this.displayedColumns = this.partnerService.getDataConf().map((c) => c.prop)
    //this.dataSource = new MatTableDataSource(this.tableService.getAll());
    this.subscriptions.push(
      this.partnerService.itemsObs.subscribe(
          data => {
              this.partner = data;
              console.log(data);
              
              this.dataSource = new MatTableDataSource<Partner>(
                  this.partner
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
  onDelete(partner: Partner) {
    console.log(partner);
    
    this.confirmDialogService.openDialog().then(result => {
       if (result) {
            this.partnerService.delete(partner);
       }
    });
  }
  onEdit(item) {
    //alert(data.id)
    //this.router.navigate(['pages/khachhang/', data.id, 'edit']);    
    this.dialog.open(PartnerEditComponent, {
      width: '600px',
      data: item
  });
  }
  onAdd(){
    //this.router.navigate(['pages/khachhang/add']);
    this.dialog.open(PartnerAddComponent, {
          width: '600px'     
    });
  }

}
