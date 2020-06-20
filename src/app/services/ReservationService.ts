import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { Reservation } from '../models/Reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './ConfigService';
import { PagedListData } from '../models/PagedListData';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends BaseService<Reservation>{

  constructor(http: HttpClient, config: ConfigService){
    super(http, config, 'Reservations');
  }

  public NewReservation(reservation: Reservation, captchaType: string, captcha: string): Observable<any>{
    return this.http.post<any>(`${this.apiBaseUrl}/api/reservations`, reservation, {
      headers: {
        "captcha": captcha,
        "captchaType": captchaType
      }
    });
  }

  public MyReservations(params:any): Observable<PagedListData<Reservation>>{
    return this.http.get<PagedListData<Reservation>>(`${this.apiBaseUrl}/api/reservations/user?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`);
  }
}
