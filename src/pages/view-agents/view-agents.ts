import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgentProfilePage} from '../agent-profile/agent-profile';

/**
 * Generated class for the ViewAgentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-agents',
  templateUrl: 'view-agents.html',
})
export class ViewAgentsPage {

  bool:any [] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAgentsPage');
  }

  returnSwitch(key:any){
    var boolKey = this.bool[key];

    if(boolKey==true){
      this.bool[key] = !boolKey;
    }else{
      var j = this.bool;
      for(var i in j){
        this.bool[i] = false;
      }
      this.bool[key] = !boolKey;
    }
    console.log(boolKey,key);

    this.navCtrl.push(AgentProfilePage);
  }

}
