import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInService } from './sign-in.service';
const TOKEN_HEADER='Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private signIn: SignInService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //add jwt token in req (localstorage)
    let authReq = req;
    const token = this.signIn.getToken();
    console.log('Interceptor Intiated');

    if (token != null) {
      console.log('Interceptor Intiated');
      authReq = authReq.clone({
         setHeaders: { Authorization: "Bearer "+token },
      });
      console.log("Outside if");
      
    }
    console.log(authReq);
    
    return next.handle(authReq);
  }
}

export const authInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
