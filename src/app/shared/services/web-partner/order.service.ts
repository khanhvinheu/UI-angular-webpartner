import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'app/shared/models/order.module';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import * as MESS from '../../../views/notifications/constants';
import { NotificationsService } from './notifications.service';



@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private API: string = environment.apiURL + '/admin/order';
    public itemsSub: BehaviorSubject<Order[]>;
    public itemsObs: Observable<Order[]>;
    public isLoadingSub: BehaviorSubject<boolean>;
    public isLoadingObs: Observable<boolean>;
    public itemSub: BehaviorSubject<Order>;
    public itemObs: Observable<Order>;
    constructor(
        public http: HttpClient,
        private thongbaoService: NotificationsService
    ) {
        this.itemsSub = new BehaviorSubject<Order[]>([]);
        this.itemsObs = this.itemsSub.asObservable();
        this.itemSub = new BehaviorSubject<Order>(null);
        this.itemObs = this.itemSub.asObservable();
        this.isLoadingSub = new BehaviorSubject<boolean>(false);
        this.isLoadingObs = this.isLoadingSub.asObservable();
    }
    findIndex(array, id: number) {
        return array.findIndex(e => e.id === id);
    }
    referById(id: number) {
        const url = `${this.API}/${id}`;
        this.http.get<Order>(url);
    }
    getDataConf() {
        return [
          {
            prop: 'id'
          },         
          {
            prop: 'maDonhang',
            name: 'Mã Đơn Hàng'
          },                   
          {
            prop: 'action',
            name: 'Action'
          }
        ];
      }
    getAll() {
        this.isLoadingSub.next(true);
        return this.http.get<Order[]>(this.API).subscribe(
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
        this.http.post<Order>(this.API, values).subscribe(
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
        
        this.http.post<Order>(url, value).subscribe(
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
