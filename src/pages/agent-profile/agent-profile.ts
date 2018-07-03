import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { TicketItem } from '../../models/ticket-item/ticket-item.interface';

/**
 * Generated class for the AgentProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agent-profile',
  templateUrl: 'agent-profile.html',
})
export class AgentProfilePage {

  orderHistoryList$: AngularFireList<TicketItem>
  ticketOrderHistory : TicketItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    this.orderHistoryList$ = this.db.list(`ticket-list/${this.navParams.data}`);
    this.orderHistoryList$.valueChanges().subscribe(x => {
      this.ticketOrderHistory = x;
      console.log(this.ticketOrderHistory);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgentProfilePage');
    console.log(this.navParams.data);
  }

}
