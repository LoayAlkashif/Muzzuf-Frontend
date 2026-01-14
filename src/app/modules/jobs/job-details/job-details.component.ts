import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../Core/services/job.service';
import { Job } from '../../../Shared/models/job.model';
import { AuthService } from '../../../Core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent implements OnInit {

  job!: Job;
  jobId!: string;

  isEmployee = false;
  isEmployer = false;

  showApplyPanel = false;
  
  textAnswers: { [questionId: number]: string } = {};


  mediaRecorders: { [questionId: number]: MediaRecorder } = {};
  recordIntervals: { [questionId: number]: any } = {};
  audioChunks: { [questionId: number]: Blob[] } = {};

  recordings: { [questionId: number]: File } = {};
  audioUrls: { [questionId: number]: string } = {};
  recordSeconds: { [questionId: number]: number } = {};
  maxRecordSeconds = 180;
  recordTimer: any;
  isRecording: { [questionId: number]: boolean } = {};
  recordInterval: any;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEmployee = this.authService.isEmployee();
    this.isEmployer = this.authService.isEmployer();

    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.loadJob();
  }

  loadJob() {
    this.jobService.getJobById(this.jobId).subscribe({
      next: (res) => {
        this.job = res;
      },
      error: () => {
        this.router.navigate(['/not-found']);
      },
    });
  }

  openApply() {
    if (!this.job.isActive) return;

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.showApplyPanel = true;
  }

  closeApply() {
    this.showApplyPanel = false;
  }

  viewApplications() {
    this.router.navigate(['/jobs', this.jobId, 'applications']);
  }

  getActionText(): string {
    if (!this.job.applicationStatus) {
      return 'Apply';
    }

    return this.job.applicationStatus;
  }

  isApplyDisabled(): boolean {
    return !!this.job.applicationStatus;
  }

  onActionClick() {
    if (!this.job.isActive) return;
    
    if (!this.job.applicationStatus) {
      this.openApply();
    }
  }

  startRecording(questionId: number) {
    if (this.isRecording[questionId]) return;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.audioChunks[questionId] = [];
      this.recordSeconds[questionId] = 0;
      this.isRecording[questionId] = true;

      const mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorders[questionId] = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        this.audioChunks[questionId].push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks[questionId], {
          type: 'audio/webm',
        });
        const audioFile = new File([audioBlob], `record-${questionId}.webm`, {
          type: 'audio/webm',
        });

        this.recordings[questionId] = audioFile;
        this.audioUrls[questionId] = URL.createObjectURL(audioBlob);

        this.isRecording[questionId] = false;
        clearInterval(this.recordIntervals[questionId]);
        delete this.mediaRecorders[questionId];

        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();

      this.recordIntervals[questionId] = setInterval(() => {
        this.recordSeconds[questionId]++;
        if (this.recordSeconds[questionId] >= this.maxRecordSeconds) {
          this.stopRecording(questionId);
        }
      }, 1000);
    });
  }

  stopRecording(questionId: number) {
    const recorder = this.mediaRecorders[questionId];
    if (recorder && recorder.state === 'recording') {
      recorder.stop();
    }
  }

  deleteRecording(questionId: number) {
    delete this.recordings[questionId];
    delete this.audioUrls[questionId];
    delete this.recordSeconds[questionId];
  }

  submitApplication() {
    for (let q of this.job.questions) {
      if (q.answerType === 'Text') {
        const answer = this.textAnswers[q.id];

        if (!answer || answer.trim().length === 0) {
          alert(`Please answer the question: "${q.questionName}"`);
          return;
        }

        if (answer.length > 500) {
          alert(`Answer must not exceed 500 characters`);
          return;
        }
      }

      if (q.answerType === 'Record') {
        if (!this.recordings[q.id]) {
          alert(`Please record an answer for: "${q.questionName}"`);
          return;
        }
      }
    }

    const formData = new FormData();
    formData.append('JobId', this.jobId);

    this.job.questions.forEach((q: any, index: number) => {
      formData.append(`Answers[${index}].QuestionId`, q.id);
      formData.append(`Answers[${index}].AnswerType`, q.answerType);

      if (q.answerType === 'Text') {
        formData.append(
          `Answers[${index}].TextAnswer`,
          this.textAnswers[q.id] || ''
        );
      } else {
        const file = this.recordings[q.id];
        if (file) {
          formData.append(`Answers[${index}].RecordFile`, file);
        }
      }
    });

    this.jobService.applyJob(formData).subscribe({
      next: () => {
        alert('Application Submitted Successfuly');
        this.showApplyPanel = false;
        this.loadJob();
      },
      error: (err) => alert(err.error.message),
    });
  }

  closeJob(){
    if(!confirm('Are you sure you want to deactive this job')) return;
    this.jobService.deactiveJob(this.jobId).subscribe({
      next: () => {
        this.job.isActive = false;
        
      },
      error: (err) => {
        alert(err.error.message || 'Something went wrong');
      }
    })
  }
}
