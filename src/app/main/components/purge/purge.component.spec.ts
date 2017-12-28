import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurgeComponent } from './purge.component';

describe('PurgeComponent', () => {
  let component: PurgeComponent;
  let fixture: ComponentFixture<PurgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
