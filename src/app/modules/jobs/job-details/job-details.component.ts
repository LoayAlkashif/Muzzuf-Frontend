import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../Core/services/job.service';
import { Job } from '../../../Shared/models/job.model';
import { AuthService } from '../../../Core/services/auth.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent implements OnInit {

  job!: Job;
  jobId!: string;

  isEmployee = false;
  isEmployer = false;

  showApplyPanel = false;


  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // this.isEmployee = this.authService.isEmployee();
    this.isEmployee = true;
    // this.isEmployer = this.authService.isEmployer();

    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.loadJob();
  }

   loadJob() {
    this.jobService.getJobById(this.jobId)
      .subscribe({
        next: (res) => {
          this.job = res;
        },
        error: () => {
          this.router.navigate(['/not-found']);
        }
      });
  }

  openApply() {

     if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/auth/login']);
    return;
  }

  this.showApplyPanel = true;
}


closeApply() {
  this.showApplyPanel = false;
}

viewApplications() {
  this.router.navigate(['/jobs', this.jobId, 'applications']);
}
}
