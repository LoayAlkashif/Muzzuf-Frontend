import { Component, OnInit } from '@angular/core';
import { EmployeeApplication } from '../../../Shared/models/EmployeeApplication';
import { AuthService } from '../../../Core/services/auth.service';
import { ApplicationService } from '../../../Core/services/application.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.css'
})
export class MyApplicationsComponent implements OnInit{


  applications: EmployeeApplication[] = [];
  currentPage = 1;
  totalPages = 1;
  selectedApplication: any | null = null;
  loading = true;

  /**
   *
   */
  constructor(private applicationService : ApplicationService) {}

loadApplications(page: number = 1) {
  this.currentPage = page;

  this.applicationService.getMyApplications(this.currentPage, 8)
    .subscribe(res => {
      this.applications = res.data;
      this.currentPage = res.currentPage;
      this.totalPages = res.totalPages;
    });
}



ngOnInit(): void {
    this.loadApplications();
}
next() {
  if (this.currentPage < this.totalPages) {
    this.loadApplications(this.currentPage + 1);
  }
}

prev() {
  if (this.currentPage > 1) {
    this.loadApplications(this.currentPage - 1);
  }
}

selectApplication(app: any) {
    this.selectedApplication = app;
  }

}
