import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pattern } from '../_models/pattern';

@Component({
  selector: 'app-pattern-preview',
  templateUrl: './pattern-preview.component.html',
  styleUrls: ['./pattern-preview.component.css']
})
export class PatternPreviewComponent implements OnInit {

  pattern: Pattern;
  constructor(private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.pattern = data['pattern'];
    });
  }

}
