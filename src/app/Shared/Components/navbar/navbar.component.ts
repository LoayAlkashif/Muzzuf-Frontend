import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Core/services/auth.service';
import { UserService } from '../../../Core/services/user.service';
import { debounceTime, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, FormsModule, TruncatePipe],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  MuzzufLogo = 'MuzzufLogoo.jpg';

  isLoggedIn = false;

  searchText = '';
  users: any[] = [];
  showDropdown = false;

  private searchSubject = new Subject<string>();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.searchSubject.pipe(debounceTime(400)).subscribe((value) => {
      this.searchUsers(value);
    });
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onSearchChange(value: string) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.searchSubject.next(value);
  }

  searchUsers(value: string) {
    if (!value.trim()) {
      this.users = [];
      this.showDropdown = false;
      return;
    }

    this.userService.searchUsers(value).subscribe(res => {
      this.users = res.data;
      this.showDropdown = true;
    });
  }


  openProfile(userId: string){
    this.showDropdown = false;
    this.router.navigate(['/user', userId]);
  }
}
