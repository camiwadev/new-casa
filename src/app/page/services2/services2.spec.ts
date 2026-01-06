import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Services2 } from './services2';

describe('Services2', () => {
  let component: Services2;
  let fixture: ComponentFixture<Services2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Services2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Services2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
