import { Component, Input, OnInit } from '@angular/core';
import { ApplicationToReturn } from '../_models/applicationToReturn';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  @Input() applications: ApplicationToReturn[];
  constructor() { }
  displayedColumns: any[] = ['name', 'description', 'approved', 'adminComment'];

  ngOnInit(): void {
  }

}
