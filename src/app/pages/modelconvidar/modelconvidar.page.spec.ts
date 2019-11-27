import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelconvidarPage } from './modelconvidar.page';

describe('ModelconvidarPage', () => {
  let component: ModelconvidarPage;
  let fixture: ComponentFixture<ModelconvidarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelconvidarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelconvidarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
