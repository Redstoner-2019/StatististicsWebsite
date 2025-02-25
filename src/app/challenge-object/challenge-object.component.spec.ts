import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeObjectComponent } from './challenge-object.component';

describe('ChallengeObjectComponent', () => {
  let component: ChallengeObjectComponent;
  let fixture: ComponentFixture<ChallengeObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeObjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
