import { Component } from '@angular/core';
import { REGIONS } from '../../../Core/DTO/register.Dto';
import { JobService } from '../../../Core/services/job.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectComponent } from '../../../Shared/multi-select/multi-select.component';
import { IJobQuestion, skills } from '../../../Core/DTO/constantVar';

@Component({
  selector: 'app-add-job',
  standalone:true,
  imports: [CommonModule, FormsModule, MultiSelectComponent],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent {

  regions = REGIONS;
  cities: string[] = [];

  languages: string[] = skills;

 
  job = {
    title: '',
    description: '',
    region: '',
    city: '',
    level: '',
    requiredLanguage: [] as string[],
    questions: [] as IJobQuestion[]
  };

  /**
   *
   */
  constructor(private jobService: JobService, private router: Router) {}

  onRegionChange(){
    const region = this.regions.find(r => r.name === this.job.region);
    this.cities = region ? region.cities : [];
    this.job.city = '';
  }

  addQuestion(){
    this.job.questions.push({
      questionName: '',
      answerType: 'Text'
    })
  }

  removeQuestion(index: number){
    this.job.questions.splice(index, 1)
  }

  submitJob(){
    this.jobService.createJob(this.job).subscribe(()=>{
      this.router.navigate(['/jobs/employer'])
    })
  }

}
