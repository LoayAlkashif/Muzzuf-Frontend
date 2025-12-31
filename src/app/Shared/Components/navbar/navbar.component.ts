import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Core/services/auth.service';
import { UserService } from '../../../Core/services/user.service';
import { debounceTime, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { UserProfile } from '../../models/user.model';

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

  showMeMenu = false;
  isEmployee = false;
  user: UserProfile | null = null;

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
    this.isEmployee = this.authService.isEmployee();

    this.authService.user$.subscribe(user => {
      this.user = user;

    });

    if (this.isLoggedIn && !this.authService.getCurrentUser()) {
    this.userService.getMyProfile().subscribe(res => {
      this.authService.setUser(res.userProfile);
    });
  }
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


  // SHow me Drop down list 

  toggleMeMenu(){
    this.showMeMenu = !this.showMeMenu
  }

  goToMyProfile(){
    this.showMeMenu = false;
    this.router.navigate(['/user/profile']);
  }

  goToEditProfile(){
    this.showMeMenu = false;
    this.router.navigate(['/user/profile'])
  }

  goToApplications() {
    this.showMeMenu = false;
    this.router.navigate(['/user/profile'])
  }

  logOut(){
    this.authService.logout();
    this.showMeMenu = false;
    this.router.navigate(['/auth/login'])
  }

  @HostListener('document:click', ['$event'])
  closeMeMenu(event: Event) {
    const target = event.target as HTMLElement;
    if(!target.closest('.me-wrapper')){
      this.showMeMenu = false;
    }
  }


}
