import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {AdminDashboardPage} from "../admin-dashboard/admin-dashboard";
import {RegisterPage} from "../register/register";
import {AgentDashboardPage} from "../agent-dashboard/agent-dashboard";
import { User } from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";
import { ProfilePage } from '../profile/profile';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User

  userProfile$: AngularFireObject<any>;

  constructor(private afAuth:AngularFireAuth, public nav: NavController,
    public alertCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, private database: AngularFireDatabase) {
    this.menu.swipeEnable(false);
    this.userProfile$ = this.database.object('profile');
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  //go to agent page
  agentlogin(){
    this.nav.setRoot(AgentDashboardPage);
  }

  // login and go to home page
  async login(user: User) {
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result.uid == "OWmja3KKcSVwtrF5olPugS5fkpH3"){
        this.nav.setRoot(AdminDashboardPage);
      }else{
        //getting the profile uid
        this.userProfile$ = this.database.object(`profile/${result.uid}`);
        this.userProfile$.snapshotChanges().take(1).subscribe(snapshot=>{
          console.log(snapshot);
          if(snapshot.key == null){//if not exist then key in profile
            this.nav.setRoot(ProfilePage);
          }else{//else proceed to dashboard
            this.nav.setRoot(AgentDashboardPage);
          }
       });
      }
    }catch(e){
      this.presentAlert(e);
    }
  }

  presentAlert(e:Error) {
    let alert = this.alertCtrl.create({
      title: e.name,
      subTitle: e.message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  

  forgotPass() {
    let forgot = this.alertCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: async data => {
            try {
              const result = await this.afAuth.auth.sendPasswordResetEmail(data.email);
              let toast = this.toastCtrl.create({
                message: 'Email was sended successfully',
                duration: 3000,
                position: 'top',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
            } catch (e) {
              this.presentAlert(e);
            }
            
          }
        }
      ]
    });
    forgot.present();
  }

}
