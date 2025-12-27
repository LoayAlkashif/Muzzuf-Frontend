import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [NgIf],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css',
})
export class ConfirmEmailComponent implements OnInit {
  message = 'Verifying your email...';
  isSuccess = false;

  private apiUrl = 'http://localhost:5016/api/Auth/confirm-email';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParamMap.get('userId');
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!userId || !token) {
      this.message = 'Invalid confirmation link.';
      this.isSuccess = false;
      return;
    }

    this.http
      .get<any>(`${this.apiUrl}?userId=${userId}&token=${token}`)
      .subscribe({
        next: (res) => {
          this.isSuccess = true;
          this.message = 'Email verified successfully';

          setTimeout(() => {
            this.router.navigate(['/auth/signin']);
          }, 1500);
        },
        error: (err) => {
          this.isSuccess = false;
          this.message = err.error?.message || 'Verification failed';
        },
      });
  }
}
