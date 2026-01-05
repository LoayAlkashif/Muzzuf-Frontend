import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../../Core/services/application.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-applications.component.html',
  styleUrl: './view-applications.component.css'
})
export class ViewApplicationsComponent implements OnInit {

  jobId!: string;
  jobTitle: string = '';

  applications: any[] =[];
  selectedApplication: any = null;

   page = 1;
  limit = 10;
  totalPages = 0;

  query: string = '';

  isLoading =false;


  constructor(private appService: ApplicationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.loadApplications()

  }

  loadApplications(){
    this.isLoading = true;
    this.appService.getJobApplications(this.jobId, this.page, this.limit, this.query).subscribe(res => {
      this.applications = res.data;
      this.totalPages = res.totalPages;

      this.jobTitle = this.applications[0].jobTitle;
      this.isLoading = false;
    });
  }

  selectApplication(app: any) {
  this.selectedApplication = app;
}

  search(){
    this.page = 1;
    this.loadApplications();
  }

  acceptApp(applicationId: number){
    this.appService.acceptApplication(applicationId).subscribe(() => {
      this.loadApplications()
    })
  }
  
  rejectApp(applicationId: number){
    this.appService.rejectApplication(applicationId).subscribe(() => {
      this.loadApplications()
    })
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadApplications();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadApplications();
    }
  }
}
