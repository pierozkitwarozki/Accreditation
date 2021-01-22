import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Pattern } from "../_models/pattern";
import { AccreditationPatternService } from "../_services/accreditation-pattern.service";
import { AlertifyService } from "../_services/alertify.service";

@Injectable()
export class PreviewPatternResolver implements Resolve<Pattern> {
  constructor(
    private patternService: AccreditationPatternService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pattern> {
    return this.patternService.get(route.params['id']).pipe(
      catchError((error) => {
        this.alertifyService.error('Wystąpił problem');
        this.router.navigate(['/admin']);
        return of(null);
      })
    );
  }
}