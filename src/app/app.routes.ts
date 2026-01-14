import { Routes } from '@angular/router';
import { NotFoundComponent } from './Shared/Components/not-found/not-found.component';
import { ViewApplicationsComponent } from './modules/applications/view-applications/view-applications.component';
import { AuthGuard } from './Core/guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'jobs', pathMatch: 'full' },
    {
        path: 'jobs',
        loadChildren: () => import('./modules/jobs/jobs.module').then(m => m.JobsModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'user',
        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'application',
        loadChildren: () => import('./modules/applications/applications.module').then(m => m.ApplicationsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'jobs/:id/applications', component: ViewApplicationsComponent, 
        canActivate: [AuthGuard],
        data: {roles: ['Employer']}
    },
     { path: '**', component: NotFoundComponent }
];
