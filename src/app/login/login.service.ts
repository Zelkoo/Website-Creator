import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async loginUser(email: string, password: string, isInValid: boolean) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/edit'])
      console.log('User logged in:', result.user);
    } catch (error) {
      isInValid = true
      console.error('Error logging in:', error);
    }
  }
}
