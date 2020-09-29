import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'app/shared/models/customer.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationsService } from './notifications.service';

import * as MESS from '../../../views/notifications/constants';
import { SanPham } from 'app/shared/models/sanpham.model';

@Injectable({
    providedIn: 'root'
})
export class SanPhamService {
    private API: string = environment.apiURL + '/admin/product';
    public itemsSub: BehaviorSubject<SanPham[]>;
    public itemsObs: Observable<SanPham[]>;
    public isLoadingSub: BehaviorSubject<boolean>;
    public isLoadingObs: Observable<boolean>;
    public itemSub: BehaviorSubject<SanPham>;
    public itemObs: Observable<SanPham>;
    constructor(
        public http: HttpClient,
        private notificationService: NotificationsService
    ) {
        this.itemsSub = new BehaviorSubject<SanPham[]>([]);
        this.itemsObs = this.itemsSub.asObservable();
        this.itemSub = new BehaviorSubject<SanPham>(null);
        this.itemObs = this.itemSub.asObservable();
        this.isLoadingSub = new BehaviorSubject<boolean>(false);
        this.isLoadingObs = this.isLoadingSub.asObservable();
    }
    findIndex(array, id: number) {
        return array.findIndex(e => e.id === id);
    }
    referById(id: number) {
        const url = `${this.API}/${id}`;
        this.http.get<SanPham>(url);
    }
    getAll() {
        this.isLoadingSub.next(true);
        return this.http.get<SanPham[]>(this.API).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    this.itemsSub.next(res['data']);
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
    getDataConf() {
        return [
          {
            prop: 'id'
          },         
          {
            prop: 'tenSanpham',
            name: 'Tên Sản Phẩm'
          },
          {
            prop: 'action',
            name: 'Action'
          }
        ];
      }
    createNew(values: any) {
        this.isLoadingSub.next(true);
        this.http.post<SanPham>(this.API, values).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    this.itemsSub.value.push(res['data']);
                    this.itemsSub.next(this.itemsSub.value);
                    this.notificationService.open(
                        MESS.INSERT_SUCCESS,
                        'bg-success'
                    );
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
    delete(value) {
        const url = `${this.API}/${value.id}`;
        this.isLoadingSub.next(true);
        this.http.delete(url).subscribe(
            data => {
                if (data['status'] === 'OK') {
                    const index = this.findIndex(this.itemsSub.value, value.id);
                    if (index !== -1) {
                        this.itemsSub.value.splice(index, 1);
                        this.itemsSub.next(this.itemsSub.value);
                        this.notificationService.open(
                            MESS.DELETE_SUCCESS,
                            'bg-success'
                        );
                    }
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
    update(value) {
        value.append('_method', 'put');
        const url = `${this.API}/${value.get('id')}`;
        this.isLoadingSub.next(true);
        console.log(value);
        
        this.http.post<SanPham>(url, value).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    const index = this.findIndex(
                        this.itemsSub.value,
                        Number.parseInt(value.get('id') + '')
                    );
                    if (index !== -1) {
                        this.itemsSub.value[index] = res['data'];
                        this.itemsSub.next(this.itemsSub.value);
                        this.notificationService.open(
                            MESS.UPDATE_SUCCESS,
                            'bg-success'
                        );
                    }
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
}
