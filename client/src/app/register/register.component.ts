import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { User } from 'src/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  registerUser() {
    const newUser: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      password: this.password,
    };

    return this.authService.RegisterUser(newUser)
      .subscribe(
        resp => {
          localStorage.setItem('token', resp.token);
          this.router.navigate(['/']);
        },
        err => {
          console.log(err)
        }
      )
  }

}
