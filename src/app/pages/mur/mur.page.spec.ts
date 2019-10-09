import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MurPage } from './mur.page';

describe('MurPage', () => {
  let component: MurPage;
  let fixture: ComponentFixture<MurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MurPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
