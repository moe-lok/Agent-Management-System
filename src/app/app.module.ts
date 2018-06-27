import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import {IonicStorageModule} from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AdminDashboardPage } from '../pages/admin-dashboard/admin-dashboard';
import { ViewAgentsPage } from '../pages/view-agents/view-agents';
import { RegisterPage} from "../pages/register/register";
import { AgentDashboardPage} from "../pages/agent-dashboard/agent-dashboard";
import { AgentProfilePage} from '../pages/agent-profile/agent-profile';
import { ProfilePage } from '../pages/profile/profile';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { OrderTicketPage } from "../pages/order-ticket/order-ticket";
import { OrderHistoryPage } from "../pages/order-history/order-history"

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AdminDashboardPage,
    ViewAgentsPage,
    RegisterPage,
    AgentDashboardPage,
    AgentProfilePage,
    ProfilePage,
    OrderTicketPage,
    OrderHistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AdminDashboardPage,
    ViewAgentsPage,
    RegisterPage,
    AgentDashboardPage,
    AgentProfilePage,
    ProfilePage,
    OrderTicketPage,
    OrderHistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
