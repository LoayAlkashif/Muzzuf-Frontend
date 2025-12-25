import { Component, OnInit } from '@angular/core';
import { TruncatePipe } from '../../../Shared/pipes/truncate.pipe';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Core/services/auth.service';
import { Job } from '../../../Shared/models/job.model';
import { JobService } from '../../../Core/services/job.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [TruncatePipe, CommonModule, FormsModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css',
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalCount = 0;


  searchQuery = '';
  isLoggedIn = false;

  /**
   *
   */
  constructor(private authService: AuthService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadJobs();
  }

  loadJobs() {
    this.jobService
    .getActiveJobs(this.currentPage, this.pageSize, this.searchQuery)
    .subscribe(res => {
      this.jobs = res.data;
      this.currentPage = res.currentPage;
      this.totalPages = res.totalPages;
      this.totalCount = res.totalCount;
    })
  }

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.loadJobs();
    }
  }

  prevPage(){
    if(this.currentPage > 1){
      this.currentPage--;
      this.loadJobs();
    }
  }

  firstPage(){
    this.currentPage =1;
    this.loadJobs();
  }


  lastPage(){
    this.currentPage = this.totalPages;
    this.loadJobs()
  }

  searchJobs() {
    this.currentPage = 1;
    this.loadJobs();
  }
}
