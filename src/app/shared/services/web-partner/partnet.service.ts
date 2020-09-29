import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partner } from 'app/shared/models/partner';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

import * as MESS from '../../../views/notifications/constants';
import { NotificationsService } from './notifications.service';



@Injectable({
    providedIn: 'root'
})
export class PartnerService {
    private API: string = environment.apiURL + '/admin/partner';
    public itemsSub: BehaviorSubject<Partner[]>;
    public itemsObs: Observable<Partner[]>;
    public isLoadingSub: BehaviorSubject<boolean>;
    public isLoadingObs: Observable<boolean>;
    public itemSub: BehaviorSubject<Partner>;
    public itemObs: Observable<Partner>;
    constructor(
        public http: HttpClient,
        private thongbaoService: NotificationsService
    ) {
        this.itemsSub = new BehaviorSubject<Partner[]>([]);
        this.itemsObs = this.itemsSub.asObservable();
        this.itemSub = new BehaviorSubject<Partner>(null);
        this.itemObs = this.itemSub.asObservable();
        this.isLoadingSub = new BehaviorSubject<boolean>(false);
        this.isLoadingObs = this.isLoadingSub.asObservable();
    }
    findIndex(array, id: number) {
        return array.findIndex(e => e.id === id);
    }
    referById(id: number) {
        const url = `${this.API}/${id}`;
        this.http.get<Partner>(url);
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
            prop: 'action',
            name: 'Action'
          }
        ];
      }
    getAll() {
        this.isLoadingSub.next(true);
        return this.http.get<Partner[]>(this.API).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    this.itemsSub.next(res['data']);
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
    createNew(values: any) {
        this.isLoadingSub.next(true);
        this.http.post<Partner>(this.API, values).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    this.itemsSub.value.push(res['data']);
                    this.itemsSub.next(this.itemsSub.value);
                    this.thongbaoService.open(
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
                        this.thongbaoService.open(
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
        
        this.http.post<Partner>(url, value).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    const index = this.findIndex(
                        this.itemsSub.value,
                        Number.parseInt(value.get('id') + '')
                    );
                    if (index !== -1) {
                        this.itemsSub.value[index] = res['data'];
                        this.itemsSub.next(this.itemsSub.value);
                        this.thongbaoService.open(
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
