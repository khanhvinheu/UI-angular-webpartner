import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/views/confirm-dialog/confirm-dialog.component';
import { CustomerComponent } from 'app/views/others/customer/customer.component';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {
    subcription: Subscription;
    constructor(private dialog: MatDialog) {}
    async openDialog() {
        let status = false;
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: 'Bạn muốn xóa ?'
        });
        await dialogRef
            .afterClosed()
            .toPromise()
            .then(result => {
                if (result) {
                    status = true;
                }
            });
        return status;
    }
    async openDialogwr() {
        let status = false;
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: 'Bạn thật sự muốn xóa nhà cung cấp?',           
        });
        await dialogRef
            .afterClosed()
            .toPromise()
            .then(result => {
                if (result) {
                    status = true;
                }
            });
        return status;
    }
}
