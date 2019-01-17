import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpEditorComponent } from './sign-up-editor.component';

describe('SignUpEditorComponent', () => {
  let component: SignUpEditorComponent;
  let fixture: ComponentFixture<SignUpEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
