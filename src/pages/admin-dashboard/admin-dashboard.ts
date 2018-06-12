import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { ViewAgentsPage } from '../view-agents/view-agents';
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the AdminDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage {

  constructor(private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,
    private toast:ToastController) {
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
    console.log('ionViewDidLoad AdminDashboardPage');
  }
  

  tab1 = HomePage;
  tab2 = ViewAgentsPage;
  

}
