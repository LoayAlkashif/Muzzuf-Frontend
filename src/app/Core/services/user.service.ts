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

  uploadProfileImage(formData: FormData){
    return this.http.post<{profileImage: string}>(
      `${this.baseUrl}/profile-image`,formData
    )
  }

  updateUser(id: string, body: any) {
  return this.http.put(
    `${this.baseUrl}/update-user/${id}`,
    body
  );
}

uploadCv(formData: FormData) {
  return this.http.post(
    `${this.baseUrl}/cv`,
    formData
  );
}


  
}
