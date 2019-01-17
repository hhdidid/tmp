import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInEditorComponent } from './sign-in-editor.component';

describe('SignInEditorComponent', () => {
  let component: SignInEditorComponent;
  let fixture: ComponentFixture<SignInEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
