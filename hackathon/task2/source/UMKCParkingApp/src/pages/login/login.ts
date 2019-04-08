import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { SignUpPage } from '../signup/signup';

import { User } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    user = {} as User;

    constructor(private afAuth: AngularFireAuth, 
                public navCtrl: NavController, public navParams: NavParams) {
    }
    
    public async login(user){
        try{
            var result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            if(result){
                console.log(result);
                this.navCtrl.push(HomePage);
            }
        }catch(e){
            console.error(e);
            alert(e)
        }
    }
  

    public register(){
        this.navCtrl.push(SignUpPage);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }
}