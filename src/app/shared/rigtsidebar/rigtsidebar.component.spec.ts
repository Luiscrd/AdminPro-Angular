import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigtsidebarComponent } from './rigtsidebar.component';

describe('RigtsidebarComponent', () => {
  let component: RigtsidebarComponent;
  let fixture: ComponentFixture<RigtsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RigtsidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RigtsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
