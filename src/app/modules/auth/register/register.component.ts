import { Component } from '@angular/core';
import { REGIONS } from '../../../Core/DTO/register.Dto';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink, NgSelectModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  
  apiUrl = 'http://localhost:5016/api/Auth/register';
  errorMessage:string = '';

  model: any = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    nationalId: '',
    region: '',
    city: '',
    bio: '',
    programmingLanguages: [],
    level: '',
    companyName: '',
    companyDescription: '',
    userType: ''
  };

  languages: string[] = [
    'C#',
    'ASP.NET Core',
    'Angular',
    'React',
    'SQL',
    'Docker'
  ];

  regions = REGIONS;
  cities: string[] = [];

  /**
   *
   */
  constructor(private http:HttpClient, private router:Router) {}

  onRegionChange(region:string) {
    const selectedRegion = this.regions.find(r => r.name === region);
    this.cities = selectedRegion ? selectedRegion.citites: [];
    this.model.city = ''; // Reset city selection when region changes
  }

  register(){
    this.http.post(this.apiUrl, this.model).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'An error occurred during registration.';
      }
    })
  }


  addTagFn(name: string) {
  return name.trim();
}
}
