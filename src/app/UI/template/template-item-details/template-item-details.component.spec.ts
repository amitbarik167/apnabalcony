import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateItemDetailsComponent } from './template-item-details.component';

describe('TemplateItemDetailsComponent', () => {
  let component: TemplateItemDetailsComponent;
  let fixture: ComponentFixture<TemplateItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
