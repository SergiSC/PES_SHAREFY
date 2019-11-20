import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfiluserPage } from './perfiluser.page';

describe('PerfiluserPage', () => {
  let component: PerfiluserPage;
  let fixture: ComponentFixture<PerfiluserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfiluserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfiluserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
