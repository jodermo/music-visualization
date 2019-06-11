import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioVizualisationVideoComponent } from './audio-vizualisation-video.component';

describe('AudioVizualisationVideoComponent', () => {
  let component: AudioVizualisationVideoComponent;
  let fixture: ComponentFixture<AudioVizualisationVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioVizualisationVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioVizualisationVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
