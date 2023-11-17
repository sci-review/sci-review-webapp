import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationShowComponent } from './investigation-show.component';

describe('InvestigationShowComponent', () => {
  let component: InvestigationShowComponent;
  let fixture: ComponentFixture<InvestigationShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigationShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestigationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
