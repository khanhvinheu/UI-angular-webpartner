import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Taikhoan } from 'app/shared/models/taikhoan.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaikhoanService } from './account.service';
import { NotificationsService } from './notifications.service';


@Injectable({
    providedIn: 'root'
})
export class LoginService {    
    
    public API: string = environment.apiURL ;
    private currentUserSubject: BehaviorSubject<Taikhoan>;
    public currentUser: Observable<Taikhoan>;   
    constructor(
        private http: HttpClient,
        private userService: TaikhoanService,
        private router: Router,       
        private thongbaoService:NotificationsService,
    ) {
        const token =
            localStorage.getItem('auth_token') !== 'undefined'
                ? localStorage.getItem('auth_token')
                : null;
        if (token) {
            this.auth().subscribe(
                res => {
                    if (res['user']) {
                        this.updateUser(res['user']);
                    } else {
                        
                    }
                },
                err => {}
            );
        }
        this.currentUserSubject = new BehaviorSubject<Taikhoan>(null);
        this.currentUser = this.currentUserSubject.asObservable();      
        
        if (this.currentUserValue) {
            this.userService.currentUser.subscribe(data => {
                const value = data.filter(e => {
                    return e.id === this.currentUserValue.id;
                })[0];
                if (value) {
                    this.updateUser(value);
                }
            });
        }
    }
    public get currentUserValue(): Taikhoan {
        return this.currentUserSubject.value;
    }
    auth(): Observable<any[]> {
        const url = `${this.API}/user`;  
        const token = localStorage.getItem('token');
        const header= {Authorization: `Bearer ${token}`};   
        return this.http.get<any>(url,{headers:header});       
    }
    login(data) {
        const url = `${this.API}/login`;
        // const url = `${this.API}/authenticate`;
        return this.http.post<any>(url, data).pipe(
            map(
                res => {      
                    //alert (res['token']);              
                    if (res['token'] && res['user']) {
                        localStorage.setItem('auth_token', res['token']);
                        this.updateUser(res['user']); 
                    }
                    return res;                   
                   
                },
                err => {}
            )
        );
        
        
    }
    updateUser(user) {     
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);        
    }
    logout() {
        const url = `${this.API}/logout`;
        const token =
            localStorage.getItem('auth_token') !== 'undefined'
                ? localStorage.getItem('auth_token')
                : null;
        if (token) {
            const formData = new FormData();
            formData.append('token', token);
            this.http.post<any>(url, formData).subscribe(res => {});
            //localStorage.removeItem('currentUser');
            localStorage.removeItem('auth_token');
            this.currentUserSubject.next(null);
        }
        this.router.navigateByUrl('/');
    }
    register(data) {
        const url = `${this.API}/register`;
        return this.http.post<any>(url, data).pipe(
            map(
                user => {
                    //alert(user['status']);
                    if (
                        user['error'] === true || user['error_email'] === true
                        
                    ) {
                        this.thongbaoService.open('Email đã tồn tại! Vui lòng đăng ký với email khác', 'bg-danger');
                    } else {
                        //this.userService.pushUserSubject(user.user);                                              
                        this.thongbaoService.open('Đăng ký tài khoản thành công', 'bg-success');
                        this.router.navigateByUrl('/');
                    }
                    return user;
                },
                err => {}
                )
                );
            }
    // reset_password(formdata: FormData) {
    //     const url = `${this.API}/reset_password`;
    //     return this.http.post<any>(url, formdata).pipe(
    //         map(
    //             data => {
    //                 this.thongbaoService.open('Vui lòng kiểm tra email để đổi mật khẩu!!', 'bg-success');
    //                 return data;
    //             },
    //             err => {}
    //         )
    //     );
    // }
    // doimatkhau(formdata): Observable<Taikhoan> {
    //     const url = `${this.API}/profile/doimatkhau`;
    //     return this.http.post<Taikhoan>(url, formdata).pipe(
    //         map(
    //             data => {
    //                 if (data['user']) {
    //                     this.updateUser(data['user']);
    //                     this.thongbaoService.open('Đổi mật khẩu thành công', 'bg-success');
    //                 }
    //                 return data;
    //             },
    //             err => {}
    //         )
    //     );
    // }

    
}
