import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { TicketItem } from '../../models/ticket-item/ticket-item.interface';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the DisplayAgentTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-agent-ticket',
  templateUrl: 'display-agent-ticket.html',
})
export class DisplayAgentTicketPage {

  nOrderHistoryList$: AngularFireList<TicketItem>
  bOrderHistoryList$: AngularFireList<TicketItem>
  ticketOrderHistory : TicketItem[];
  bTicketOrderHistory : TicketItem[];
  pdg:any;
  total:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
    var currentUser = afAuth.auth.currentUser;
    var ticketId = this.navParams.data.key;
    this.pdg = this.navParams.data.pdg;
    this.total = this.navParams.data.total;

    this.nOrderHistoryList$ = this.db.list(`ticket-list/${currentUser.uid}/${ticketId}/normalTicket`);
    this.nOrderHistoryList$.valueChanges().subscribe(x => {
      this.ticketOrderHistory = x;
      console.log(this.ticketOrderHistory);
    });

    this.bOrderHistoryList$ = this.db.list(`ticket-list/${currentUser.uid}/${ticketId}/boxTicket`);
    this.bOrderHistoryList$.valueChanges().subscribe(y => {
      this.bTicketOrderHistory = y;
      console.log(this.bTicketOrderHistory.length);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayAgentTicketPage');
  }

}
