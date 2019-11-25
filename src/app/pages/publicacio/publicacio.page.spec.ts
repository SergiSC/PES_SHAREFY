import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacioPage } from './publicacio.page';

describe('PublicacioPage', () => {
  let component: PublicacioPage;
  let fixture: ComponentFixture<PublicacioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
