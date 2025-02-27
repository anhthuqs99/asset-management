import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AtmDetailComponent } from './components/atm-detail/atm-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'atm', component: AtmDetailComponent },
  { path: 'atm/:id', component: AtmDetailComponent },
];
