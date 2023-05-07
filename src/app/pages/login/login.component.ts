import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TestLoadingService } from '../../shared/services/test-loading.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription; 
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private loadingService: TestLoadingService, private authService: AuthService){}
  ngOnInit(): void {
  }

  async login(){
    this.loading = true;
      this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
        console.log(cred);
        this.router.navigateByUrl('/contact');
        this.loading = false;
      }).catch(error => {
        console.log("Üres, vagy rosszul kitöltött mező!");
        this.loading = false;
        let errorCode = (error as FirebaseError).code;
        if(errorCode === 'auth/invalid-email') {
          console.log("****HELYTELEN VAGY ÜRES EMAIL MEZŐ****");
        }
        if(errorCode === 'auth/missing-password') {
          console.log("****NEM ADTÁL MEG JELSZÓT****");
        }
        return null;
      });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}
