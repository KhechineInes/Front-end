import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPubComponent } from './add-edit-pub.component';

describe('AddEditPubComponent', () => {
  let component: AddEditPubComponent;
  let fixture: ComponentFixture<AddEditPubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
