import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrsbarComponent } from './progrsbar.component';

describe('ProgrsbarComponent', () => {
  let component: ProgrsbarComponent;
  let fixture: ComponentFixture<ProgrsbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrsbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrsbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
