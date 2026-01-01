export interface EmployeeApplication {
  id: number;
  jobTitle: string;
  companyName: string;
  companyLogo: string,
  jobCity: string;
  jobRegion: string;
  status: string;
  appliedAt: string;
  answers: ApplicationAnswer[];
}

export interface ApplicationAnswer {
  questionName: string;
  answerType: number;
  textAnswer?: string;
  recordUrl?: string;
}