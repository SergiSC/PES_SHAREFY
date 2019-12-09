import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalconvidarPage } from './modalconvidar.page';

describe('ModalconvidarPage', () => {
  let component: ModalconvidarPage;
  let fixture: ComponentFixture<ModalconvidarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalconvidarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalconvidarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
