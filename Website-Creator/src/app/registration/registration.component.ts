import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthRegisterService} from "./create-user.service";

@Component({
  selector: 'registration-component',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent{
  email!: string;
  password!: string;
  emailIsInvalid!: boolean;
  constructor(private router: Router,private authService: AuthRegisterService) {
  }
  private isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  public async addUser() {
    if (!this.isEmailValid(this.email)) {
      this.emailIsInvalid = true
      console.error('Invalid email format');
      return;
    }
    await this.authService.addNewUser(this.email, this.password);
  }
}
