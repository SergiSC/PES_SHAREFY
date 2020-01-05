import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarcompletPage } from './avatarcomplet.page';

describe('AvatarcompletPage', () => {
  let component: AvatarcompletPage;
  let fixture: ComponentFixture<AvatarcompletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarcompletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarcompletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
