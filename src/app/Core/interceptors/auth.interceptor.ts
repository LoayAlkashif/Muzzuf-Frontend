import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const router = inject(Router);
  const authServcie = inject(AuthService)

  const token = authServcie.getToken();
  let authReq = req;

  
  if (token && authServcie.isTokenExpired()) {
  authServcie.logout();
  router.navigate(['/auth/login']);
  return throwError(() => new Error('Token expired'));
}


  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  return next(authReq).pipe(catchError((error) => {
    if(error.status === 401){
      authServcie.logout();
      router.navigate(['/auth/login']);
    }

    return throwError(() => error)
  }))
};
