import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/ReservationService';
import { LoadingService } from 'src/app/services/LoadingService';
import { Reservation } from 'src/app/models/Reservation';
import { ColumnInfo } from 'src/app/models/ColumnInfo';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.less']
})
export class MyReservationComponent implements OnInit {


  public reservations: Array<Reservation>;
  public pageNumber = 1;
  public pageSize = 10;
  public total = 10;

  columns: Array<ColumnInfo> = [
    { 
      ColumnName: 'ReservationPlaceName',
      DisplayName: "活动室名称" 
    },
    { 
      ColumnName: 'ReservationForDate',
      DisplayName: "预约使用日期" 
    }, 
    { 
      ColumnName: 'ReservationForTime',
      DisplayName: "预约使用时间" 
    },
    { 
      ColumnName: 'ReservationUnit',
      DisplayName: "预约单位" 
    },
    { 
      ColumnName: 'ReservationActivityContent',
      DisplayName: "活动内容" 
    },
    { 
      ColumnName: 'ReservationPersonName',
      DisplayName: "预约人名称" 
    },
    { 
      ColumnName:'ReservationTime',
      DisplayName: "预约时间" 
    },
    {
      ColumnName:'Operations',
      DisplayName: "操作" 
    }
  ];

  displayedColumns: Array<string>;

  constructor(private svc: ReservationService, private loadingSvc: LoadingService) {
    this.displayedColumns = this.columns.map(c=>c.ColumnName);
   }

  ngOnInit() {    
    this.loadData({
      pageNumber: 1,
      pageSize: 10
    });
  }

  private loadData(params?:object): void{
    if(this.loadingSvc.isLoading === false){
      this.loadingSvc.isLoading = true;
    }
    if(!params){
      params = {
        pageNumber: 1,
        pageSize: 10
      };
    }
    this.svc.MyReservations(params)
    .subscribe(data => {
      console.log(data);
      this.pageNumber = data.PageNumber;
      this.pageSize = data.PageSize;
      this.total = data.TotalCount;
      this.reservations = data.Data;
      
      // 修改 LoadingService 的 isLoading
      this.loadingSvc.isLoading = false;
    });
  }

  cancel(reservationId){
    console.log(`reservation(${reservationId}) is canceling`);
    if(this.loadingSvc.isLoading === false){
      this.loadingSvc.isLoading = true;
    }
    this.svc.CancelReservation(reservationId)
    .subscribe(data=>{
      console.log(data);
      this.loadData();
      
      this.loadingSvc.isLoading = false;
    })
  }

  onPageEvent(pageParams){
    this.loadData({
      pageNumber: pageParams.pageIndex + 1,
      pageSize: pageParams.pageSize
    });
  }
}
