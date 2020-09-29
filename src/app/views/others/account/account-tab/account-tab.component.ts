import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountAddComponent } from '../account-add/account-add.component';

@Component({
  selector: 'app-account-tab',
  templateUrl: './account-tab.component.html',
  styleUrls: ['./account-tab.component.scss']
})
export class AccountTabComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  onAdd(){
    //this.router.navigate(['pages/khachhang/add']);
    this.dialog.open(AccountAddComponent, {
          width: '600px'     
    });
  }

}
