import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthRegisterService {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

    async addNewUser(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.router.navigate(['/login'])
      console.log('New user created:', result.user);
    } catch (error) {
      console.error('Error creating new user:', error);
    }
  }
}
