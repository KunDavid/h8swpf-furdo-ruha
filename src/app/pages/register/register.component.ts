import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordAgain: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    }),
    address: new FormControl('')
  });

  constructor(private location: Location, private authService: AuthService, private userService: UserService, private router: Router, ){

  }
  ngOnInit(): void {
      
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.authService.signup(this.registerForm.get('email')?.value as string, this.registerForm.get('password')?.value as string).then(cred => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.registerForm.get('email')?.value as string,
        ordername: this.registerForm.get('email')?.value?.split('@')[0] as string,
        name: {
          firstname: this.registerForm.get('name.firstname')?.value as string,
          lastname: this.registerForm.get('name.lastname')?.value as string
        },
        address: this.registerForm.get('address')?.value as string
      };
      this.userService.create(user).then(_ => {
        console.log("Felhasználó sikeresen hozzáadva");
        this.router.navigateByUrl('/contact');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });
  }

  goBack(){
    this.location.back();
  }

}
