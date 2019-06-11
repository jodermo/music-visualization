import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioVisualisationComponent } from './audio-visualisation.component';

describe('AudioVisualisationComponent', () => {
  let component: AudioVisualisationComponent;
  let fixture: ComponentFixture<AudioVisualisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioVisualisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
