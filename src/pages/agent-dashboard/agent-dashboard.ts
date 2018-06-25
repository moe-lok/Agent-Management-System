import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, MenuController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import { LoginPage } from "../login/login";
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { OrderTicketPage } from '../order-ticket/order-ticket';

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


  constructor(private afAuth:AngularFireAuth, 
    public nav: NavController, public alertCtrl: AlertController, public menu: MenuController, public toast: ToastController)  {
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
  //go to order page
  order(){
    this.nav.setRoot(OrderTicketPage);
  }

}
