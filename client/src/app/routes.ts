import { Routes } from '@angular/router';
import { ApplicationPreviewComponent } from './application-preview/application-preview.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { LoginComponent } from './login/login.component';
import { PatternPreviewComponent } from './pattern-preview/pattern-preview.component';
import { RegisterComponent } from './register/register.component';
import { ApplicationResolver } from './_resolvers/application.resolver';
import { PreviewPatternResolver } from './_resolvers/previewpattern.resolver';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'patterns/:id',
    component: PatternPreviewComponent,
    runGuardsAndResolvers: 'always',
    resolve: { pattern: PreviewPatternResolver },
  },
  {
    path: 'applications/:id',
    component: ApplicationPreviewComponent,
    runGuardsAndResolvers: 'always',
    resolve: { application: ApplicationResolver },
  },
  { path: 'admin', component: HomeAdminComponent },
  { path: 'user', component: HomeUserComponent },
];
