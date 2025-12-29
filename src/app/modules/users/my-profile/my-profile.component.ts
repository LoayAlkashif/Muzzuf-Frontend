import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../../Shared/models/user.model';
import { UserService } from '../../../Core/services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../../Core/services/auth.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [FormsModule,CommonModule,NgIf],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {

  user!:UserProfile;

  isEmployer = false;
isEmployee = false;

  /**
   *
   */
  constructor(private userService: UserService, private authService: AuthService) { }


 ngOnInit(): void {

    this.isEmployer = this.authService.isEmployer();
  this.isEmployee = this.authService.isEmployee();

    this.userService.getMyProfile()
      .subscribe(res => {
        this.user = res.userProfile;
      });
  }

}
