import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgentProfilePage} from '../agent-profile/agent-profile';
import { AngularFireDatabase} from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { Observable } from 'rxjs/Observable';

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

  profileList : Observable<Profile[]>;
  list:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {

    this.profileList = db.list<Profile>('profile').snapshotChanges().map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAgentsPage');
  }

  returnSwitch(key:any){
    
    console.log(key);

    this.navCtrl.push(AgentProfilePage, key);
  }

}
