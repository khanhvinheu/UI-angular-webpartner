import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'app/shared/models/customer.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationsService } from './notifications.service';

import * as MESS from '../../../views/notifications/constants';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private API: string = environment.apiURL + '/admin/customer';
    public itemsSub: BehaviorSubject<Customer[]>;
    public itemsObs: Observable<Customer[]>;
    public isLoadingSub: BehaviorSubject<boolean>;
    public isLoadingObs: Observable<boolean>;
    public itemSub: BehaviorSubject<Customer>;
    public itemObs: Observable<Customer>;
    constructor(
        public http: HttpClient,
        private notificationService: NotificationsService
    ) {
        this.itemsSub = new BehaviorSubject<Customer[]>([]);
        this.itemsObs = this.itemsSub.asObservable();
        this.itemSub = new BehaviorSubject<Customer>(null);
        this.itemObs = this.itemSub.asObservable();
        this.isLoadingSub = new BehaviorSubject<boolean>(false);
        this.isLoadingObs = this.isLoadingSub.asObservable();
    }
    findIndex(array, id: number) {
        return array.findIndex(e => e.id === id);
    }
    referById(id: number) {
        const url = `${this.API}/${id}`;
        this.http.get<Customer>(url);
    }
    getAll() {
        this.isLoadingSub.next(true);
        return this.http.get<Customer[]>(this.API).subscribe(
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
            prop: 'tenCongty',
            name: 'Tên Công Ty'
          },
          {
            prop: 'diaChi',
            name: 'Địa Chỉ'
          },
          {
            prop: 'website',
            name: 'Website'
          },
          {
            prop: 'tinhTrang',
            name: 'Tình Trạng'
          },
          {
            prop: 'action',
            name: 'Action'
          }
        ];
      }
    createNew(values: any) {
        this.isLoadingSub.next(true);
        this.http.post<Customer>(this.API, values).subscribe(
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
        
        this.http.post<Customer>(url, value).subscribe(
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
