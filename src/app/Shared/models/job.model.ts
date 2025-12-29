export interface Job {
    id: string;
    employerName: string;
    companyName: string;
    title: string;
    description: string;
    region: string;
    city: string;
    level: string;
    requiredLanguage: string[];
    isActive: boolean;

    questions: JobQuestion[];
}

export interface JobQuestion {
  id: number;
  questionName: string;
  answerType: 'Text' | 'Record';

  answer?: string;
}