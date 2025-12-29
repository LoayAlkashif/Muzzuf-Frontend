import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../../Shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl = 'http://localhost:5016/api/User';

  constructor(private http: HttpClient) {}

  searchUsers(term: string) {
    return this.http.get<any>(`${this.baseUrl}/search?query=${term}`);
  }

  getUserById(id: string) {
    return this.http.get<{ userProfile: UserProfile }>(
      `${this.baseUrl}/${id}`)
  }

  
  getMyProfile() {
    return this.http.get<{ userProfile: UserProfile }>(
      `${this.baseUrl}/profile`)
  }
}
