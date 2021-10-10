import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFiltersComponent } from './template-filters.component';

describe('TemplateFiltersComponent', () => {
  let component: TemplateFiltersComponent;
  let fixture: ComponentFixture<TemplateFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
