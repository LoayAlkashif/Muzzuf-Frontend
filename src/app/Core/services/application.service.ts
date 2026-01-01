import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmployeeApplication } from "../../Shared/models/EmployeeApplication";
import { PagedResult } from "../DTO/PagedResult";

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

    // Employer get job applications 
    getJobApplications(jobId: number): Observable<any[]>{
        return this.http.get<any[]>(`${this.baseUrl}/job/${jobId}`)
    }

    // accept application
    // acceptEmployeeApplication(applicationId: number){
    //     return this.http.put(`${this.baseUrl}/${applicationId}/accept`);
    // }

}