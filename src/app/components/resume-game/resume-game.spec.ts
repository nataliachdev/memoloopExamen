import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeGame } from './resume-game';

describe('ResumeGame', () => {
  let component: ResumeGame;
  let fixture: ComponentFixture<ResumeGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeGame],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
