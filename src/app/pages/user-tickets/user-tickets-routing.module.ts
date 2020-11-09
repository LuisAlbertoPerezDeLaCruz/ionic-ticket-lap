import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTicketsPage } from './user-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: UserTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTicketsPageRoutingModule {}
