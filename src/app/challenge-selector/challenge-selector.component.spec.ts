import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeSelectorComponent } from './challenge-selector.component';

describe('ChallengeSelectorComponent', () => {
  let component: ChallengeSelectorComponent;
  let fixture: ComponentFixture<ChallengeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
