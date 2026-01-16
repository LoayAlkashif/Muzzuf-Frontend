import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from '../../Shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private userSubject = new BehaviorSubject<UserProfile | null>(null);
    user$ = this.userSubject.asObservable();

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole():string | null {
    const token = localStorage.getItem('token');
    if(!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));

    return ( payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null)
  }

  getUserId(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return (
    payload[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ] || null
  );
}

getCurrentUser(): UserProfile | null {
  return this.userSubject.value;
}

getToken(): string | null {
  return localStorage.getItem('token');
}

  isEmployer(): boolean {
    return this.getRole() === 'Employer';
  }

  isEmployee(): boolean {
    return this.getRole() === 'Employee';
  }

    setUser(user: UserProfile) {
    this.userSubject.next(user);
  }

  isTokenExpired():boolean{
    const token = this.getToken();
    if(!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
