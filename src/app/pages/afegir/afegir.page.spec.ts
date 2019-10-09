import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfegirPage } from './afegir.page';

describe('AfegirPage', () => {
  let component: AfegirPage;
  let fixture: ComponentFixture<AfegirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfegirPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfegirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
