import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPublicacioPage } from './vista-publicacio.page';

describe('VistaPublicacioPage', () => {
  let component: VistaPublicacioPage;
  let fixture: ComponentFixture<VistaPublicacioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPublicacioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPublicacioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
