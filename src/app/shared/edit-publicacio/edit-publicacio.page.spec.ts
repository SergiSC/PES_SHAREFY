import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublicacioPage } from './edit-publicacio.page';

describe('EditPublicacioPage', () => {
  let component: EditPublicacioPage;
  let fixture: ComponentFixture<EditPublicacioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPublicacioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPublicacioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
