import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import { LoginPage } from "../login/login";
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile';

/**
 * Generated class for the AgentDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agent-dashboard',
  templateUrl: 'agent-dashboard.html',
})
export class AgentDashboardPage {

  //profileData: FirebaseObjectObservable<Profile>
  profileData = {} as Profile;

  constructor(private afAuth:AngularFireAuth, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams, private toast:ToastController) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.toast.create({
          message: `Welcome to MKT app, ${data.email}`,
          duration: 3000
        }).present();

      }else{
        this.toast.create({
          message: `Could not find authentication details`,
          duration: 3000
        }).present();
      }
    });
    console.log('ionViewDidLoad AgentDashboardPage');
  }

  logout() {
    try{
      this.afAuth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    }catch(e){
      console.error(e);
    }
  }

}
