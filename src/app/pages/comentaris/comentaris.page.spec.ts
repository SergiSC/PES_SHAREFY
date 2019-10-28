import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarisPage } from './comentaris.page';

describe('ComentarisPage', () => {
  let component: ComentarisPage;
  let fixture: ComponentFixture<ComentarisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentarisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
