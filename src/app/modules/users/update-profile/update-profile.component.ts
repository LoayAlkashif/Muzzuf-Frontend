import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../Core/services/user.service';
import { AuthService } from '../../../Core/services/auth.service';
import { Router } from '@angular/router';
import { MultiSelectComponent } from '../../../Shared/multi-select/multi-select.component';
import { REGIONS } from '../../../Core/DTO/register.Dto';


@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,MultiSelectComponent],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {
activeTab: 'general' | 'skills' | 'cv' = 'general';
user: any;

isEmployee = false;

regions = REGIONS
cities: string[] = [];


allSkills: string[] = [
    'C#',
    'ASP.NET Core',
    'Angular',
    'React',
    'SQL',
    'Docker'
  ];

  selectedSkills: string[] = [];

  selectedCv!:File;

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

      this.userService.updateUser(this.user.id, body).subscribe(() => {
        this.loadProfile()
      })
    }

    saveSkills(){
      const body = {
        programmingLanguages: this.selectedSkills
      }
      this.userService.updateUser(this.user.id, body).subscribe(() => {
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


}
