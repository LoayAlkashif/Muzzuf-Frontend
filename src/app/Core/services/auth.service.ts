import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole():string | null {
    const token = localStorage.getItem('token');
    if(!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.role  || null;
  }


  isEmployer(): boolean {
    return this.getRole() === 'Employer';
  }

  isEmployee(): boolean {
    return this.getRole() === 'Employee';
  }
}
