import { Component } from '@angular/core';
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { OrderTicketPage } from '../order-ticket/order-ticket';
import {AngularFireAuth} from "angularfire2/auth";

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

  constructor(private afAuth:AngularFireAuth, public nav: NavController, public alertCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController)  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgentDashboardPage');
  }
  //go to order page
  order(){
    this.nav.setRoot(OrderTicketPage);
  }

}
