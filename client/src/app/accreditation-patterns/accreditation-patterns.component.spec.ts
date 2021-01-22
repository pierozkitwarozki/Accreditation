import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationPatternsComponent } from './accreditation-patterns.component';

describe('AccreditationPatternsComponent', () => {
  let component: AccreditationPatternsComponent;
  let fixture: ComponentFixture<AccreditationPatternsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccreditationPatternsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationPatternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
