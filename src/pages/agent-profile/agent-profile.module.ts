import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgentProfilePage } from './agent-profile';

@NgModule({
  declarations: [
    AgentProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(AgentProfilePage),
  ],
})
export class AgentProfilePageModule {}
