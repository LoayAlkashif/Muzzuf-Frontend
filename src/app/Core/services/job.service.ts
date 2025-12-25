import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Job } from "../../Shared/models/job.model";
import { PagedResult } from "../../Shared/models/PagedResult";

@Injectable({providedIn: 'root'})

export class JobService {
    private baseUrl = 'http://localhost:5016/api/Job';

   
    constructor(private http: HttpClient) {}

        getActiveJobs(
            page: number,
            limit: number,
            query?: string
        ): Observable<PagedResult<Job>> 
        {

            let params = new HttpParams()
            .set('page',page.toString())
            .set('limit',limit.toString());

            if(query){
                params = params.set('query', query.toString());
            }

            return this.http
            .get<PagedResult<Job>>(`${this.baseUrl}/active-jobs`,
                {params}
            )
        }
    
}