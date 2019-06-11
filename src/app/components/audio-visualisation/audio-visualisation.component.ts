import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';

declare var window, navigator;

@Component({
  selector: 'app-audio-visualisation',
  templateUrl: './audio-visualisation.component.html',
  styleUrls: ['./audio-visualisation.component.scss']
})
export class AudioVisualisationComponent implements AfterViewInit {
  @Output() onLevelChange = new EventEmitter<number>();


  audioContext = null;
  meter = null;
  rafID = null;
  mediaStreamSource;
  level = 0;
  multiply = 1.4;
  started = false;

  constructor() {
  }

  ngAfterViewInit() {
  }

  start() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        'audio': {
          'mandatory': {
            'googEchoCancellation': 'false',
            'googAutoGainControl': 'false',
            'googNoiseSuppression': 'false',
            'googHighpassFilter': 'false'
          },
          'optional': []
        },
      }, (e) => {
        this.gotStream(e);
      }, () => {
        this.didntGetStream();
      });
    } else if (navigator.webkitGetUserMedia) {
      navigator.webkitGetUserMedia({
        'audio': {
          'mandatory': {
            'googEchoCancellation': 'false',
            'googAutoGainControl': 'false',
            'googNoiseSuppression': 'false',
            'googHighpassFilter': 'false'
          },
          'optional': []
        },
      }, (e) => {
        this.gotStream(e);
      }, () => {
        this.didntGetStream();
      });
    }
    this.started = true;
    this.onStart();
  }

  gotStream(stream) {
    this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
    this.meter = this.createAudioMeter(this.audioContext);
    this.mediaStreamSource.connect(this.meter);
    this.audioLoop();
  }

  audioLoop(time: any = null) {
    const val = this.meter.volume * this.multiply;
    if (this.level !== val) {
      this.level = val;
      this._levelChange(this.level);
    }
    this.rafID = window.requestAnimationFrame((t) => {
      this.audioLoop(t);
    });
  }

  _levelChange(level = this.level) {
    this.level = level;
    this.onLevelChange.emit(level);
    this.levelChange(level);
  }


  didntGetStream() {
    alert('Stream generation failed.');
  }

  createAudioMeter(audioContext, clipLevel: number = .98, averaging: number = .95, clipLag: number = 750) {
    const processor = audioContext.createScriptProcessor(512);
    processor.onaudioprocess = volumeAudioProcess;
    processor.clipping = false;
    processor.lastClip = 0;
    processor.volume = 0;
    processor.clipLevel = clipLevel;
    processor.averaging = averaging;
    processor.clipLag = clipLag;
    processor.connect(audioContext.destination);
    processor.checkClipping = function () {
      if (!this.clipping) {
        return false;
      }
      if ((this.lastClip + this.clipLag) < window.performance.now()) {
        this.clipping = false;
      }
      return this.clipping;
    };
    processor.shutdown = function () {
      this.disconnect();
      this.onaudioprocess = null;
    };

    function volumeAudioProcess(event) {
      const buf = event.inputBuffer.getChannelData(0);
      const bufLength = buf.length;
      let sum = 0;
      let x;
      for (let i = 0; i < bufLength; i++) {
        x = buf[i];
        if (Math.abs(x) >= this.clipLevel) {
          this.clipping = true;
          this.lastClip = window.performance.now();
        }
        sum += x * x;
      }
      const rms = Math.sqrt(sum / bufLength);
      this.volume = Math.max(rms, this.volume * this.averaging);
    }

    return processor;
  }


  levelChange(level = this.level) {

  }

  onStart(){

  }
}
