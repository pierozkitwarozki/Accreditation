import { Component, OnInit } from '@angular/core';
import { AccreditationToReturn } from '../_models/accreditationToReturn';
import { AccreditationService } from '../_services/accreditation.service';

@Component({
  selector: 'app-accreditations',
  templateUrl: './accreditations.component.html',
  styleUrls: ['./accreditations.component.css'],
})
export class AccreditationsComponent implements OnInit {
  accreditations: AccreditationToReturn[];
  displayedColumns: any[] = ['name', 'description', 'validDate'];
  constructor(private accreditationService: AccreditationService) {}

  ngOnInit(): void {
    this.accreditationService
      .getAll(JSON.parse(localStorage.getItem('user')).id)
      .subscribe((data) => {
        this.accreditations = data;
      },
      error => console.log(error));
  }
}
