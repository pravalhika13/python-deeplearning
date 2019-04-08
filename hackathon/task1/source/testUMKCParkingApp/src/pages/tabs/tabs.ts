import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { SignUpPage } from '../signup/signup';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = LoginPage;
    tab2Root = SignUpPage;

  constructor() {

  }
}
