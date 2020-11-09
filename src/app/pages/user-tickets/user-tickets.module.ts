import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTicketsPageRoutingModule } from './user-tickets-routing.module';

import { UserTicketsPage } from './user-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTicketsPageRoutingModule
  ],
  declarations: [UserTicketsPage]
})
export class UserTicketsPageModule {}
