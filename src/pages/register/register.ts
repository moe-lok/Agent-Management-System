import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { User } from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  user = {} as User;

  constructor(private afAuth:AngularFireAuth, public nav: NavController) {
  }

  // register and go to home page
  async register(user: User) {
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
    }catch(e){
      console.error(e);
    }
    //this.nav.setRoot(HomePage);
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
