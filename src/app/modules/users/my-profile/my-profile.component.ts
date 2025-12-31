import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../../Shared/models/user.model';
import { UserService } from '../../../Core/services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../../Core/services/auth.service';
import { Router } from '@angular/router';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [FormsModule,CommonModule,NgIf, ImageCropperComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {

  user!:UserProfile;

  isEmployer = false;
isEmployee = false;

previewImage: string | ArrayBuffer | null = null;
selectedFile!: File;

imageChangedEvent: any = '';
croppedImage: Blob | null = null;
showCropper = false;

  /**
   *
   */
  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }


 ngOnInit(): void {

 if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/']);
    return;
  }

    this.isEmployer = this.authService.isEmployer();
  this.isEmployee = this.authService.isEmployee();

    this.userService.getMyProfile()
      .subscribe(res => {
        this.user = res.userProfile;
        this.authService.setUser(res.userProfile); 
      });
  }


  uploadProfileImage() {
    const formData = new FormData();
    formData.append('file', this.selectedFile)

    this.userService.uploadProfileImage(formData)
    .subscribe({
      next: (res) => {
        this.user.profileImageUrl = res.profileImage;
        this.previewImage = null;
      },
      error: (error) => {
        alert(`Failed to upload image: ${error.error?.message || error.message}`);
      }
    })
  }

  
  onImageSelected(event: Event) {
this.imageChangedEvent = event;
  this.showCropper = true;
  }

  imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.blob!;
}

cancelCrop() {
  this.showCropper = false;
  this.imageChangedEvent = null;
}

saveCroppedImage() {
  if (!this.croppedImage) return;

  const formData = new FormData();
  formData.append('file', this.croppedImage, 'profile.png');

  this.userService.uploadProfileImage(formData).subscribe({
    next: (res) => {
      this.user.profileImageUrl = res.profileImage;
      this.showCropper = false;
    },
    error: () => alert('Upload failed')
  });
}



}
