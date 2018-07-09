import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayAgentTicketPage } from './display-agent-ticket';

@NgModule({
  declarations: [
    DisplayAgentTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayAgentTicketPage),
  ],
})
export class DisplayAgentTicketPageModule {}
