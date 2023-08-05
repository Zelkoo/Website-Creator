import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthLoginService} from "./login.service";

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent{
  email!: string;
  password!: string;
  isInValid: boolean = false
constructor(private router: Router,private authService: AuthLoginService) {
}

  async loginUser() {
    await this.authService.loginUser(this.email, this.password, this.isInValid);
  }
  public navigateToRegister() {
    this.router.navigate(['/registration'])
  }
}
