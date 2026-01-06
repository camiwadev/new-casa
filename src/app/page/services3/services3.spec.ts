import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Services3 } from './services3';

describe('Services3', () => {
  let component: Services3;
  let fixture: ComponentFixture<Services3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Services3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Services3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
