import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewAgentsPage } from './view-agents';

@NgModule({
  declarations: [
    ViewAgentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewAgentsPage),
  ],
})
export class ViewAgentsPageModule {}
