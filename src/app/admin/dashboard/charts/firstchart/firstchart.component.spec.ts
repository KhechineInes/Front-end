import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstchartComponent } from './firstchart.component';

describe('FirstchartComponent', () => {
  let component: FirstchartComponent;
  let fixture: ComponentFixture<FirstchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
