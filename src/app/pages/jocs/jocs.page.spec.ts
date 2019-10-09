import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JocsPage } from './jocs.page';

describe('JocsPage', () => {
  let component: JocsPage;
  let fixture: ComponentFixture<JocsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JocsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JocsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
