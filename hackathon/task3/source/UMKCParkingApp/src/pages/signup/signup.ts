import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignUpPage {
    user = {} as User;

    constructor(private afAuth: AngularFireAuth, 
                public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignUpPage');
    }

    async register(user: User){
        try{
            const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
            console.log(result);
            this.navCtrl.pop();
        }catch(e){
            console.error(e);
        }
    }
    
    ngAfterViewInit() {
        let tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map((key) => {
                tabs[key].style.display = 'none';
            });
        }
    }
    
    ionViewWillLeave() {
        let tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map((key) => {
                tabs[key].style.display = 'flex';
            });

        }
    }

}