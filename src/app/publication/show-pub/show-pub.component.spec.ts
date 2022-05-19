import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPubComponent } from './show-pub.component';

describe('ShowPubComponent', () => {
  let component: ShowPubComponent;
  let fixture: ComponentFixture<ShowPubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
