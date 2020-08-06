import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService) { }

  intercept(req, next) {
    let reqWithToken = req.clone(
      {
        headers: req.headers.set('Authorization', `bearer ${this.authService.getToken()}`)
      }
    );
    return next.handle(reqWithToken)
  }
}
