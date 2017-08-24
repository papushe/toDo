import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllToDoComponent } from './all-to-do.component';

describe('AllToDoComponent', () => {
  let component: AllToDoComponent;
  let fixture: ComponentFixture<AllToDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllToDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
