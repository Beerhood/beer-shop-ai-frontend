import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-auth-page',
  imports: [CardModule, ButtonModule],
  templateUrl: './auth-page.component.html',
})
export class AuthPage implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  SignInWithGoogle() {
    this.authService.handleAuthRedirect('Hubabuab', true);
  }
}
