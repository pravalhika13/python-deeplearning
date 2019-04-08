import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignUpPage } from '../signup/signup';
import { HomePage } from '../home/home';

/**
 *Interface for User
 */
 export interface User{
    id:       string,
    pw:       string,
    name:     string,
    umkcId:   string
 }
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }
  
  public login(){
    if(true){
        this.goToHome();
    }else{
    
    }
    
  }
  
  public goToSignUp(){
    this.navCtrl.push(SignUpPage);
  }
  
  public goToHome(){
    this.navCtrl.push(HomePage);
  }
  

}