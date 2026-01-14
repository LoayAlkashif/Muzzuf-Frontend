import { Component } from '@angular/core';
import { REGIONS, RegisterDto } from '../../../Core/DTO/register.Dto';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { MultiSelectComponent } from '../../../Shared/multi-select/multi-select.component';
import { skills } from '../../../Core/DTO/constantVar';


@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink, NgSelectModule,NgIf,MultiSelectComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  
  apiUrl = 'http://localhost:5016/api/Auth/register';
  errorMessage:string = '';

  successMessage: string = '';
  showSuccess : boolean = false;

  model: RegisterDto = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // nationalId: '',
    region: '',
    city: '',
    bio: '',
    programmingLanguages: [],
    level: '',
    companyName: '',
    companyDescription: '',
    userType: undefined
  };

  languages: string[] = skills

  regions = REGIONS;
  cities: string[] = [];

  /**
   *
   */
  constructor(private http:HttpClient, private router:Router) {}

  onRegionChange(region:string) {
    const selectedRegion = this.regions.find(r => r.name === region);
    this.cities = selectedRegion ? selectedRegion.cities: [];
    this.model.city = ''; // Reset city selection when region changes
  }

  register(){
    this.http.post(this.apiUrl, this.model).subscribe({
      next: () => {
        this.showSuccess  = true;
        alert('Registration successful! Please check your email to activate your account.');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
      console.error('Registration error:', error);
      this.errorMessage = error.error?.message || error.message || 'An error occurred during registration.';
      this.showSuccess = false;
}
    })
  }


  addTagFn(name: string) {
  return name.trim();
}
}
