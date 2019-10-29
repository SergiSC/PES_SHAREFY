import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliPopOverComponent } from './publi-pop-over.component';

describe('PubliPopOverComponent', () => {
  let component: PubliPopOverComponent;
  let fixture: ComponentFixture<PubliPopOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubliPopOverComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubliPopOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
