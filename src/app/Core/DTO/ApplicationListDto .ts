import { ApplicationAnswerDetailsDto } from "./ApplicationAnswerDetailsDto";
import { PagedResult } from "./PagedResult";

export interface ApplicationListDto {
  id: number;
  employeeId: string;
  employeeName: string;
  profileImageUrl: string | null;
  jobTitle: string;
  cvUrl: string | null;
  status: string;
  appliedAt: string;
  answers: ApplicationAnswerDetailsDto[];
}


