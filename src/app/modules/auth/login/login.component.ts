import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
    MuzzufLogo = "MuzzufLogoo.jpg"

    email='';
    password='';

    errorMessage = '';

    private apiUrl = 'http://localhost:5016/api/Auth/login';
    /**
     *
     */
    constructor(private http: HttpClient, private router:Router,
       private authService:AuthService) {}

    login(){
      const body = {
        email: this.email,
        password: this.password
      };

      this.http.post<any>(this.apiUrl, body).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);

          const role = this.authService.getRole();
          if(this.authService.isEmployer()){
            this.router.navigate(['/jobs/employer']);
          }
            else{
              this.router.navigate(['/jobs']);
            }
        },
        error: (err) => {
          this.errorMessage = err?.error.message  || "Internal server error"
        }
      });

    }
      
}
