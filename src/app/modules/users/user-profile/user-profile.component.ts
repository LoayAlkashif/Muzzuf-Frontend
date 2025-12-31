import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from '../../../Shared/models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  user!:UserProfile;
  userId!: string;

  /**
   *
   */
  constructor(private userService: UserService, private route : ActivatedRoute,
     private router: Router, private authService: AuthService) { }


 ngOnInit(): void {

  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/']);
    return;
  }

  this.route.paramMap.subscribe(params => {
    this.userId = params.get('id')!;
    const currentUserId = this.authService.getUserId();

    if (currentUserId && currentUserId === this.userId) {
      this.router.navigate(['/user/profile']);
      return;
    }

    this.loadProfile();
  });
}


  loadProfile(){
    this.userService.getUserById(this.userId).subscribe(res => {
      this.user = res.userProfile;
    })
  }

}
