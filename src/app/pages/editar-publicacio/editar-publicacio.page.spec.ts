import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPublicacioPage } from './editar-publicacio.page';

describe('EditarPublicacioPage', () => {
  let component: EditarPublicacioPage;
  let fixture: ComponentFixture<EditarPublicacioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPublicacioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPublicacioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
