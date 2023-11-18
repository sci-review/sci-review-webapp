import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationsComponent } from './investigations.component';

describe('QuestionsComponent', () => {
  let component: InvestigationsComponent;
  let fixture: ComponentFixture<InvestigationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestigationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
