import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoChatWebRTCComponent } from './video-chat-web-rtc.component';

describe('VideoChatWebRTCComponent', () => {
  let component: VideoChatWebRTCComponent;
  let fixture: ComponentFixture<VideoChatWebRTCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoChatWebRTCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoChatWebRTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
