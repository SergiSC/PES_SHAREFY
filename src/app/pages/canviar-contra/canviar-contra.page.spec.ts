import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanviarContraPage } from './canviar-contra.page';

describe('CanviarContraPage', () => {
  let component: CanviarContraPage;
  let fixture: ComponentFixture<CanviarContraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanviarContraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanviarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
