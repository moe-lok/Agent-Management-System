import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TicketItem } from '../../models/ticket-item/ticket-item.interface';
import {AngularFireAuth} from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';
import { DisplayAgentTicketPage } from '../display-agent-ticket/display-agent-ticket';

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {

  orderHistoryList$: AngularFireList<TicketItem>
  ticketOrderHistory : Observable<TicketItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase,
  private afAuth: AngularFireAuth) {

    var currentUser = afAuth.auth.currentUser;
    if ( currentUser !== null) {
        console.log("user id: " + currentUser.uid);
        this.orderHistoryList$ = this.database.list(`ticket-list/${currentUser.uid}`);
    }

    this.ticketOrderHistory = this.orderHistoryList$.snapshotChanges().map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
    );

  }

  
  viewOrderHistoryDetails(key:any,padang:any,total:any){
    var obj= {
      key:key,
      pdg:padang,
      total:total
    }
    console.log(key);
    this.navCtrl.push(DisplayAgentTicketPage,obj);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
  }

}
