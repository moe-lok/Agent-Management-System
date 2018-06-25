import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderTicketPage } from './order-ticket';

@NgModule({
  declarations: [
    OrderTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderTicketPage),
  ],
})
export class OrderTicketPageModule {}
