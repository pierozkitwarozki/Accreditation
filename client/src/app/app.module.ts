import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { AccreditationPatternsComponent } from './accreditation-patterns/accreditation-patterns.component';
import { PatternPreviewComponent } from './pattern-preview/pattern-preview.component';
import { PreviewPatternResolver } from './_resolvers/previewpattern.resolver';

// Angular - material modules
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { FileUploadModule } from 'ng2-file-upload';
import { HomeUserComponent } from './home-user/home-user.component';
import { ApplicationPreviewComponent } from './application-preview/application-preview.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationResolver } from './_resolvers/application.resolver';
import { AccreditationsComponent } from './accreditations/accreditations.component';



export function tokenGetter() {
  return localStorage.getItem('acc_token');
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeAdminComponent,
    UserManagerComponent,
    AccreditationPatternsComponent,
    PatternPreviewComponent,
    HomeUserComponent,
    ApplicationPreviewComponent,
    ApplicationsComponent,
    AccreditationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FileUploadModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatListModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth'],
      },
    }),
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
    MatInputModule,
    MatSlideToggleModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ErrorInterceptorProvider, PreviewPatternResolver, ApplicationResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
