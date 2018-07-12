import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisNewComponent } from './pais-new.component';

describe('PaisNewComponent', () => {
  let component: PaisNewComponent;
  let fixture: ComponentFixture<PaisNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaisNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
