import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../../Core/services/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingButtonComponent } from '../../../Shared/Components/loading-button/loading-button.component';
import { LoaderService } from '../../../Core/services/loader.service';

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
  actionLoading = false;

  applications: any[] =[];
  selectedApplication: any = null;

   page = 1;
  limit = 10;
  totalPages = 0;

  query: string = '';

  isLoading =false;


  constructor(private appService: ApplicationService, private route: ActivatedRoute,
     private router: Router, private loader: LoaderService) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.loadApplications()

  }

  loadApplications(){
    this.isLoading = true;
    this.appService.getJobApplications(this.jobId, this.page, this.limit, this.query).subscribe(res => {
      this.jobTitle = res.jobTitle;
      this.applications = res.applications.data;
      this.totalPages = res.applications.totalPages;

      this.selectedApplication = null;
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
    this.loader.show();
     this.appService.acceptApplication(applicationId).subscribe({
    next: () => {
      this.loadApplications();
      this.selectedApplication = null;
      this.loader.hide();
    },
    error: () => {
      this.loader.hide();
    }
  });
  }
  
  rejectApp(applicationId: number) {
  this.loader.show();

  this.appService.rejectApplication(applicationId).subscribe({
    next: () => {
      this.loadApplications();
      this.selectedApplication = null;
      this.loader.hide();
    },
    error: () => {
      this.loader.hide();
    }
  });
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
  
  goToProfile(userId: string){
    this.router.navigate(['/user', userId]);
  }
}
