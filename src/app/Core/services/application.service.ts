import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmployeeApplication } from "../../Shared/models/EmployeeApplication";
import { PagedResult } from "../DTO/PagedResult";
import { JobApplicationsResponseDto } from "../DTO/JobApplicationsResponseDto";

@Injectable({
    providedIn: 'root'
})
export class ApplicationService{
    private readonly baseUrl = 'http://localhost:5016/api/Application';

    /**
     *
     */
    constructor(private http: HttpClient) {}

  getMyApplications(page: number, limit: number) {
  return this.http.get<PagedResult<EmployeeApplication>>(
    `${this.baseUrl}/my-applications?page=${page}&limit=${limit}`
  );
}



    applyForJob(jobId: number, formData: FormData): Observable<any>{
        return this.http.post(`${this.baseUrl}/apply-job/${jobId}`, formData);
    }
    
   getJobApplications(jobId: string, page:number, limit:number , query:string) {
  return this.http.get<JobApplicationsResponseDto>(
    `${this.baseUrl}/job/${jobId}?page=${page}&limit=${limit}&query=${query}`
  );
}

acceptApplication(applicationId: number) {
  return this.http.put(`${this.baseUrl}/${applicationId}/accept`, {});
}

rejectApplication(applicationId: number) {
  return this.http.put(`${this.baseUrl}/${applicationId}/reject`, {});
}


}