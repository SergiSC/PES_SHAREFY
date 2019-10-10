import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacioPage } from './informacio.page';

describe('InformacioPage', () => {
  let component: InformacioPage;
  let fixture: ComponentFixture<InformacioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
