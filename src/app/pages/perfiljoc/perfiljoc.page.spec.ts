import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfiljocPage } from './perfiljoc.page';

describe('PerfiljocPage', () => {
  let component: PerfiljocPage;
  let fixture: ComponentFixture<PerfiljocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfiljocPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfiljocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
