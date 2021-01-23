import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pattern } from '../_models/pattern';
import { PatternToAdd } from '../_models/patternToAdd';
import { UserToReturn } from '../_models/userToReturn';
import { AccreditationPatternService } from '../_services/accreditation-pattern.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-accreditation-patterns',
  templateUrl: './accreditation-patterns.component.html',
  styleUrls: ['./accreditation-patterns.component.css'],
})
export class AccreditationPatternsComponent implements OnInit {
  //stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = true;
  loggedUser: UserToReturn = JSON.parse(localStorage.getItem('user'));

  // table
  patterns: Pattern[] = [];
  displayedColumns: any[] = ['id', 'name', 'description'];

  constructor(
    private patternService: AccreditationPatternService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.initalizeFormGroup();
  }

  initalizeFormGroup() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
  }

  getAll() {
    this.patternService.getAll().subscribe(
      (data) => {
        debugger;
        this.patterns = data;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  add() {
    debugger;
    const pat: PatternToAdd = {
      name: this.firstFormGroup.get('firstCtrl').value,
      description: this.secondFormGroup.get('secondCtrl').value,
    };
    this.patternService.add(pat).subscribe(
      (next) => {
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.getAll();
        this.alertify.message('Pomyślnie dodano akredytację');
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
