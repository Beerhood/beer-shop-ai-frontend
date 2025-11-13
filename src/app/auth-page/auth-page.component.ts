import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-auth-page',
  imports: [CardModule, ButtonModule],
  templateUrl: './auth-page.component.html',
})
export class AuthPage implements OnInit {
  ngOnInit() {
    throw new Error('Method not implemented.');
  }

  SignInWithGoogle() {
    throw new Error('Method not implemented.');
  }
}
