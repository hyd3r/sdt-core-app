import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeadsListPage } from './leads-list.page';
import { LeadsInfoComponent } from '../leads/leads-info/leads-info.component';

const routes: Routes = [
  {
    path: '',
    component: LeadsListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeadsListPage,LeadsInfoComponent],
  entryComponents: [LeadsInfoComponent]
})
export class LeadsListPageModule {}
