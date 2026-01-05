import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})

export class JobService {
    private baseUrl = 'http://localhost:5016/api/Job';

   
    constructor(private http: HttpClient, private authService: AuthService) {}

    getJobs(page: number, limit:number, query:string){
        let url = `${this.baseUrl}/active-jobs`;

        if(this.authService.isEmployer()){
            url = `${this.baseUrl}/employer-jobs`;
        }

        return this.http.get<any>(url,{
            params: {

                page,
                limit,
                query}
        })

    }

    getJobById(id:string){
        return this.http.get<any>(`${this.baseUrl}/${id}`);
    }


    applyJob(formData: FormData) {
    return this.http.post(
    'http://localhost:5016/api/Application/apply-job',
    formData
  );
}

createJob(body: any){
    return this.http.post(
        `${this.baseUrl}/create-job`, body
    )
}
   
}