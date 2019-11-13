import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacitatPage } from './privacitat.page';

describe('PrivacitatPage', () => {
  let component: PrivacitatPage;
  let fixture: ComponentFixture<PrivacitatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacitatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacitatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
