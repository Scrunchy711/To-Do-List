import { UiService } from './../ui/ui.service';
import { User } from './user.model';
import { AuthData } from './auth.data.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'
import * as Auth from '../auth/auth.action'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afauth: AngularFireAuth,
    private router: Router,
    private store: Store<fromRoot.State>,
    private uiService: UiService
  ) { }

  private user: User

  initAuthListener(){
    this.afauth.authState.subscribe(user=>{
      if(user){
        // Can consider how to use this to make mutiple users to access their own seperate data in firestore
        var uid = user.uid
        this.store.dispatch(new Auth.SetAuthenticated())
        this.router.navigate(['/addActivity'])
      }else{
        this.store.dispatch(new Auth.SetUnauthenticated())
        this.router.navigate([''])
      }
    })
  }

  registerUser(authData: AuthData){
    this.afauth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).catch(error=>{
      this.uiService.showSnackbar(error.message,null,3000)
    })
  }

  login(authData:AuthData){
    this.afauth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).catch(error=>{
      this.uiService.showSnackbar(error.message,null,3000)
    })
  }

  logout() {
    this.afauth.signOut()
  }
  
}




