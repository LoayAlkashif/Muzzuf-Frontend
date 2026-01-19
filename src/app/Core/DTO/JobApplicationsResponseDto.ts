import { ApplicationListDto } from "./ApplicationListDto ";
import { PagedResult } from "./PagedResult";

export interface JobApplicationsResponseDto {
  jobId: number;
  jobTitle: string;
  applications: PagedResult<ApplicationListDto>;
}
