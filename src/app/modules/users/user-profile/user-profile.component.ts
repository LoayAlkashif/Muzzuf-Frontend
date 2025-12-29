import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from '../../../Shared/models/user.model';
import { CommonModule } from '@angular/common';

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
  constructor(private userService: UserService, private route : ActivatedRoute) { }


  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.loadProfile();
  }

  loadProfile(){
    this.userService.getUserById(this.userId).subscribe(res => {
      this.user = res.userProfile;
    })
  }




}
