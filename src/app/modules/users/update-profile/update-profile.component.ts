import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../Core/services/user.service';
import { AuthService } from '../../../Core/services/auth.service';
import { Router } from '@angular/router';
import { MultiSelectComponent } from '../../../Shared/multi-select/multi-select.component';
import { REGIONS } from '../../../Core/DTO/register.Dto';
import { UserProfile } from '../../../Shared/models/user.model';
import { skills } from '../../../Core/DTO/constantVar';


@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,MultiSelectComponent],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {
activeTab: 'general' | 'skills' | 'cv' | 'company' | 'logo'= 'general';
user!: UserProfile;

isEmployee = false;
isEmployer = false;

regions = REGIONS
cities: string[] = [];
userId!: string | null;

allSkills: string[] = skills;

  selectedSkills: string[] = [];

  selectedCv!:File;
  companyLogoFile: File | null = null;

  /**
   *
   */
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

    
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
       this.router.navigate(['/auth/login'])
       return;
    }

    this.isEmployee = this.authService.isEmployee();
    this.isEmployer = this.authService.isEmployer();
    this.userId = this.authService.getUserId();
    this.loadProfile()

  }

    loadProfile(){
      this.userService.getMyProfile().subscribe(res => {
        this.user = res.userProfile;
        this.selectedSkills = [...(this.user.programmingLanguages || [])];

        const selectedRegion = this.regions.find(
      r => r.name === this.user.region
    );

    this.cities = selectedRegion ? selectedRegion.cities : [];

      });
    }

    saveGeneralInfo() {
      const body = {
        fullName: this.user.fullName,
        bio: this.user.bio,
        region: this.user.region,
        city: this.user.city
      }

      this.userService.updateUser(this.userId, body).subscribe(() => {
        this.loadProfile()
      })
    }

    saveSkills(){
      const body = {
        programmingLanguages: this.selectedSkills
      }
      this.userService.updateUser(this.userId, body).subscribe(() => {
        this.loadProfile()
      })
    }

    onCvSelected(event: Event){
      const input = event.target as HTMLInputElement;
      if(!input.files?.length) return;
      this.selectedCv = input.files[0];
    }

    uploadCv(){
      if(!this.selectedCv) return;
      const formData = new FormData();
      formData.append('file', this.selectedCv);

      this.userService.uploadCv(formData).subscribe(() => {
        this.loadProfile();
      })
    }

    onRegionChange() {
  const selectedRegion = this.regions.find(
    r => r.name === this.user.region
  );

  this.cities = selectedRegion ? selectedRegion.cities : [];
  this.user.city = ''; 
}


saveCompanyInfo(){
  const body = {
    companyName: this.user.companyName,
    companyDescription: this.user.companyDescription
  }

  this.userService.updateUser(this.userId, body).subscribe(() => {
    this.loadProfile();
  })
}

onCompanyLogoSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.companyLogoFile = input.files[0];
  }
}


uploadCompanyLogo() {
  if (!this.companyLogoFile) return;

  this.userService.uploadCompanyLogo(this.companyLogoFile)
    .subscribe(() => {
      this.companyLogoFile = null;
      this.loadProfile();
    });
}
}
