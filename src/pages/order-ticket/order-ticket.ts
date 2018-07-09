import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TicketItem } from '../../models/ticket-item/ticket-item.interface';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase';


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
  //ticketList: TicketItem[];
  rawTicket: string;
  //tp: TicketItem[]=[];
  //btp: TicketItem[]=[];
  pdgCtr: string;

  ticketItemRef$: AngularFireList<any>;
  //boxTicket: AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private database: AngularFireDatabase,private afAuth: AngularFireAuth, private alertCtrl: AlertController) {
    var currentUser = afAuth.auth.currentUser;
    if ( currentUser !== null) {
        console.log("user id: " + currentUser.uid);
        this.ticketItemRef$ = this.database.list(`ticket-list/${currentUser.uid}`);
        //this.boxTicket = this.database.list(`boxTicket/${currentUser.uid}`);
    }

    
    //this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)

  }

  //main function for ticket
  testTicket(ticket: string){
    /**
     * this will split string into newlines
     * first line will be for padang
     * the rest of the line is appended to entry array
     * to be processed by processTicket
     */
    var t = ticket.split("\n");
    console.log(t);
    var padang = t[0];
    var entry:any[] = [];
    for(var i= 1; i < t.length; i++){
      entry.push(t[i]);
    }
    console.log(padang);
    console.log(this.numberOfpadang(padang));
    console.log(entry);
    this.processTicket(entry);

  }

  numberOfpadang(pdg: string){
    /**
     * takes string like "123364"
     * sort and duplicates remove
     * to output like "12346" to pdgCtr
     */
    var arr = pdg.split("").sort();
    var unique = arr.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.pdgCtr = unique.join("");
    console.log(this.pdgCtr);
    return this.pdgCtr;
  }

  processTicket(entry: string[]){
    /**
     * takes an array of string ticket like ["1234#1#0","*2345#0#1"]
     * split to normal ticket and box ticket (ticket with '*' infront)
     * by using 'type' identifier passed through processHash function
     */
    var tp: TicketItem[]=[];
    var btp: TicketItem[]=[];
    for(let i of entry){
      if(i.charAt(0)!="*"){
        var t = this.processHash(i,"normal");
        tp.push(t);
        console.log(tp);
      }else{
        console.log("box number: "+i);
        var bt = this.processHash(i.substr(1),"box");
        btp.push(bt);
      }
    }
    console.log(tp);
    this.addTicketItem(tp,btp);
    //this.boxTicket.push(tp);
  }

  processHash(raw: string, type: string){
    var j = raw.split("#");
    console.log(j);
    var t = {} as TicketItem;
    t.ticketType = type;
    t.ticketNumber = parseInt(j[0]);
    t.bigAmount = parseInt(j[1]);
    if(j[2]==null){
      t.smallAmount = 0;
    }else{
      t.smallAmount = parseInt(j[2]);
    }
    return t;
  }

  boxCalculator(btp:TicketItem):number{
    var str = btp.ticketNumber.toString().split('');
    str.sort();
    var current:any = null;
    var count = 0;
    var freqPat:number[]=[]
    for(let i in str){
      if(str[i] != current){
        if(count > 0){
          freqPat.push(count);
        }
        current = str[i]
        count = 1;
      }else{
        count++;
      }
    }
    if(count > 0){
      freqPat.push(count);
    }
    //this.calculatePattern(freqPat);
    return this.calculatePattern(freqPat);
  }

  calculatePattern(freqPat:number[]){
    freqPat.sort();
    var str:string;
    str = freqPat.join("");
    switch(str){
      case "4":{
        return 1;
      }
      case "13":{
        return 4;
      }
      case "22":{
        return 6;
      }
      case "112":{
        return 12;
      }
      case "1111":{
        return 24;
      }
    }
  }

  calculateTotal(nt: TicketItem[], bt:TicketItem[]){
    var totalPrice: number = 0;
    for(let tp of nt){
      totalPrice += this.pdgCtr.length*(tp.bigAmount+tp.smallAmount);
    }
    for(let btp of bt){
      var box = this.boxCalculator(btp);
      console.log("box repeat: "+ box);
      totalPrice += this.pdgCtr.length*(box*(btp.bigAmount+btp.smallAmount));
    }
    console.log(totalPrice);
    return totalPrice
  }

  printReceipt(total:number, pdg:string, tp:TicketItem[], btp:TicketItem[]){
    
    var date = new Date();
    console.log(date);
    var datetime = date.getDate() + "/"
                + (date.getMonth()+1)  + "/" 
                + date.getFullYear() + " @ "  
                + date.getHours() + ":"  
                + date.getMinutes() + ":" 
                + date.getSeconds();
    console.log(datetime);
    
    var msg:string="<p>"+datetime+"</p><p>"+ pdg +"</p><p>"+ total +"</p>";
    for(let t of tp){
      msg+="<p>"+t.ticketNumber+"-"+t.bigAmount+"-"+t.smallAmount+"</p>";
    }
    for(let bt of btp){
      msg+="<p>"+bt.ticketNumber+"-"+bt.bigAmount+"-"+bt.smallAmount+"</p>";
    }
    return msg;
  }

  

  addTicketItem(normalTicket: TicketItem[], boxTicket: TicketItem[]){
    /*
    create a new anonymous object and convert ticket number to a number
    push this object to Firebase under ticket-list
    */
   

    var total = this.calculateTotal(normalTicket, boxTicket);
    var timeStamp = firebase.database.ServerValue.TIMESTAMP;

    this.ticketItemRef$.push({
      timeStamp: timeStamp,
      total:total,
      padang:this.pdgCtr,
      normalTicket,
      boxTicket
    }).then((x)=>{
      //display receipt
      
      let msg = this.printReceipt(total,this.pdgCtr,normalTicket,boxTicket);
      let alert = this.alertCtrl.create({
        title: 'Order Submitted',
        subTitle: msg,
        //message: msg,
        buttons: [
          {
            text: 'Done',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'send',
            handler: () => {
              window.open(`whatsapp://send?text=${msg}`, '_system');
              console.log('Buy clicked');
            }
          }
        ]
      });
      alert.present();

    this.ticketItem = {} as TicketItem;

    //navigate the user back to dashboard
    this.navCtrl.pop();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderTicketPage');
  }

}
