import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationToReturn } from '../_models/applicationToReturn';
import { Pattern } from '../_models/pattern';
import { AccreditationPatternService } from '../_services/accreditation-pattern.service';
import { AlertifyService } from '../_services/alertify.service';
import { ApplicationService } from '../_services/application.service';

@Injectable()
export class ApplicationResolver implements Resolve<ApplicationToReturn> {
  loggedUser = JSON.parse(localStorage.getItem('user'));
  constructor(
    private applicationService: ApplicationService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ApplicationToReturn> {
    return this.applicationService.get(route.params['id']).pipe(
      catchError((error) => {
        this.alertifyService.error('Wystąpił problem');
        if (this.loggedUser.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (this.loggedUser.role === 'User') {
            this.router.navigate(['/user']);
        }

        return of(null);
      })
    );
  }
}
