import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taikhoan } from 'app/shared/models/taikhoan.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationsService } from './notifications.service';
import * as MESS from '../../../views/notifications/constants';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Injectable({
    providedIn: 'root'
})
export class TaikhoanService {
    constructor(
        public http: HttpClient,       
        private notificationService: NotificationsService,    
        public dialog: MatDialog,    
    ) {
        this.userSubject = new BehaviorSubject<Taikhoan[]>(this.users);
        this.currentUser = this.userSubject.asObservable();        
    }
    users: Taikhoan[] = [];
    public userSubject: BehaviorSubject<Taikhoan[]>;
    public currentUser: Observable<Taikhoan[]>;
    public API: string = environment.apiURL + '/admin/account';
    getCountUser() {
        return this.userSubject.value.length;
    }
    pushUserSubject(data: Taikhoan) {
        this.userSubject.value.push(data);
    }
    referById(id) {
        const url = `${this.API}/${id}`;
        return this.http.get<Taikhoan>(url);
    }
    getAll() {
        return this.http.get<Taikhoan[]>(this.API).subscribe(res => {
            this.userSubject.next(res);    
            // console.log(this.userSubject);
                                        
        });
       
        
    }
    getOne(id: number): Observable<Taikhoan> {
        const url = `${this.API}/${id}`;
        return this.http.get<Taikhoan>(url);
    }
    createNew(user: any): Observable<Taikhoan> {             
        //this.isLoadingSub.next(true);
        this.http.post<Taikhoan>(this.API, user).subscribe(
            user => {
                if (
                    user['error'] === true ||
                    user['error_email'] === true
                    
                ) {
                    this.notificationService.open('Email đã tồn tại! Vui lòng đăng ký với email khác', 'bg-danger');
                } else {
                    //this.userService.pushUserSubject(user.user);                        
                    this.notificationService.open('Đăng ký tài khoản thành công', 'bg-success');    
                    this.getAll();   
                    this.dialog.closeAll();
                   // this.dialogRef.close();        
                }

                return user;
            },
            err => {}
            )
          
        return this.http.post<Taikhoan>(this.API, user);
        
    }
    delete(user: Taikhoan): Observable<any> {       
        const url = `${this.API}/${user.id}`;
        //return this.http.delete(url);
        this.http.delete<Taikhoan>(url).subscribe(
            user => {
                if (
                    user['status'] === 'OK'  
                ) {
                    this.notificationService.open('Xóa thành công!', 'bg-success');
                    this.getAll();
                } else {
                    //this.userService.pushUserSubject(user.user);                        
                    this.notificationService.open('Xóa thất bại, kiểm tra lại!', 'bg-danger');  
                }

                return user;
            },
            err => {}
            )
          
        return this.http.post<Taikhoan>(this.API, user);
    }    
    update(formdata: FormData): Observable<Taikhoan> {
        const url = `${this.API}/${formdata.get('id')}`;   
        return this.http.post<Taikhoan>(url, formdata).pipe(
            map(data => {
                this.userSubject.value.map(e => {
                    if (e.id === data.id) {
                         e.tenNhanvien = data.tenNhanvien;
                         e.chucVu = data.chucVu;
                         e.email = data.email;
                         e.hinhAnh = data.hinhAnh;    
                         e.quyen = Number.parseInt(data.quyen + ''); 
                    }
                    return e;
                });
                this.userSubject.next(this.userSubject.value);
                this.getAll();
                this.notificationService.open('Cập nhật thành công!', 'bg-success');    
                return data;
            })
        );
    }    
    
}
