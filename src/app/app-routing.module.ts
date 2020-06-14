import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { NoticeListComponent } from './notice/notice-list/notice-list.component';
import { NoticeDetailComponent } from './notice/notice-detail/notice-detail.component';
import { AboutComponent } from './about/about.component';
import { NewReservationComponent } from './reservation/new-reservation/new-reservation.component';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { AuthCallbackComponent } from './account/auth-callback/auth-callback.component';

const routes: Routes = [
  { path: '', component: ReservationListComponent },
  { path: 'reservation/new', component:NewReservationComponent, canActivate: [AuthGuard] },
  { path: 'reservation', component: ReservationListComponent },
  { path: 'notice', component: NoticeListComponent },
  { path: 'notice/:noticePath', component: NoticeDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/callback', component: AuthCallbackComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
