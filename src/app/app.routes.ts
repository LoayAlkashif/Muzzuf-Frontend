import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'jobs', pathMatch: 'full' },
    {
        path: 'jobs',
        loadChildren: () => import('./modules/jobs/jobs.module').then(m => m.JobsModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    }
];
