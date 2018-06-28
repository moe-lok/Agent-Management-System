import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TicketItem } from '../../models/ticket-item/ticket-item.interface';
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the OrderTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-ticket',
  templateUrl: 'order-ticket.html',
})
export class OrderTicketPage {

  //create a new object of ticket
  ticketItem = {} as TicketItem;

  ticketItemRef$: AngularFireList<TicketItem>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase,private afAuth: AngularFireAuth) {
    var currentUser = afAuth.auth.currentUser;
    if ( currentUser !== null) {
        console.log("user id: " + currentUser.uid);
        this.ticketItemRef$ = this.database.list(`ticket-list/${currentUser.uid}`);
    }
    //this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)

  }

  addTicketItem(ticketItem: TicketItem){
    /*
    create a new anonymous object and convert ticket number to a number
    push this object to Firebase under ticket-list
    */
    this.ticketItemRef$.push({
      ticketNumber: Number(this.ticketItem.ticketNumber)
    }).then(()=>{
      //reset ticket item
    this.ticketItem = {} as TicketItem;

    //navigate the user back to dashboard
    this.navCtrl.pop();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderTicketPage');
  }

}
