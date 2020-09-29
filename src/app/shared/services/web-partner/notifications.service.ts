import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsComponent } from 'app/views/notifications/notifications.component';


@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    constructor(private _snackBar: MatSnackBar) {}
    open(data?: string, color?: string): void {
        this._snackBar.openFromComponent(NotificationsComponent, {
            duration: 1500,
            data,
            verticalPosition: 'bottom',
            panelClass: [color]
        });
    }
}
