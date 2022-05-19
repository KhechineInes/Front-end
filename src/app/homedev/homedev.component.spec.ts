import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomedevComponent } from './homedev.component';

describe('HomedevComponent', () => {
  let component: HomedevComponent;
  let fixture: ComponentFixture<HomedevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomedevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomedevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
