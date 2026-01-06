import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Services1 } from './services1';

describe('Services1', () => {
  let component: Services1;
  let fixture: ComponentFixture<Services1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Services1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Services1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
