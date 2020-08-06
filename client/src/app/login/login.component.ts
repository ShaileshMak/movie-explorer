import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName:string = '';
  password:string = '';

  constructor(private authService: AuthService,
              private router:Router) { }

  ngOnInit() {
  }

  loginUser() {
    return this.authService.LoginUser(this.userName, this.password)
    .subscribe(
      resp => {
        localStorage.setItem('token', resp.token);
        this.router.navigate(['/']);
      },
      err => {
        alert('Login Failed');
        console.log(err)
      }
    )     
  }

}
