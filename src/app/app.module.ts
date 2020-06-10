import { reducers } from './app.reducer';
import { MaterialModule } from './material/material.module';
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AddActivityModule } from './add-activity/add-activity.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component'
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    AppComponent,
    SidenavListComponent
    
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    AddActivityModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers)


    
    
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
