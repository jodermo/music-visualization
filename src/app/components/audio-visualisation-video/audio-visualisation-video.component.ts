import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AudioVisualisationComponent } from '../audio-visualisation/audio-visualisation.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from '@angular/http';
import { CanvasDrawings } from './canvas-drawings';


@Component({
  selector: 'app-audio-visualisation-video',
  templateUrl: './audio-visualisation-video.component.html',
  styleUrls: ['./audio-visualisation-video.component.scss']
})
export class AudioVisualisationVideoComponent extends AudioVisualisationComponent implements OnInit {
  @ViewChild('visualisationContainer') visualisationContainer: ElementRef;
  @ViewChild('mediaContainer') mediaContainer: ElementRef;
  @ViewChild('imageContainer') imageContainer: ElementRef;
  @ViewChild('canvasContainer') canvasContainer: ElementRef;
  @ViewChild('filterOverlay') filterOverlay: ElementRef;

  canvasDrawings;

  started = false;
  videoSources = [
    '/assets/videos/1.mp4',
    '/assets/videos/2.mp4',
    '/assets/videos/3.mp4',
    '/assets/videos/4.mp4',
    '/assets/videos/5.mp4',
    '/assets/videos/6.mp4',
    '/assets/videos/7.mp4',
    '/assets/videos/8.mp4',
    '/assets/videos/9.mp4',
    '/assets/videos/10.mp4',
    '/assets/videos/11.mp4',
    '/assets/videos/12.mp4',
    '/assets/videos/13.mp4',
    '/assets/videos/14.mp4',
    '/assets/videos/15.mp4',
    '/assets/videos/16.mp4',
    '/assets/videos/17.mp4',
    '/assets/videos/18.mp4',
    '/assets/videos/19.mp4',
    '/assets/videos/20.mp4',
    '/assets/videos/21.mp4',
    '/assets/videos/22.mp4',
    '/assets/videos/23.mp4',
    '/assets/videos/24.mp4',
    '/assets/videos/25.mp4',
    '/assets/videos/26.mp4',
    '/assets/videos/27.mp4',
    '/assets/videos/28.mp4',
    '/assets/videos/29.mp4',
    '/assets/videos/30.mp4'
  ];
  imageSources = [
    '/assets/images/01.jpg',
    '/assets/images/02.jpg',
    '/assets/images/03.jpg',
    '/assets/images/04.jpg',
    '/assets/images/05.jpg'
  ];
  video;
  videos = [];
  image;
  images = [];
  lastLevel = 0;
  canvas;
  canvasDrawing = null;

  config: any = {
    videoTimeShiftLevel: .33,
    videoSwitchLevel: .66,
    imageSwitchLevel: .44,
    canvasSwitchLevel: .5,
    filterLevel: .2,
    help: true,
    settings: false
  };


  blendModes = [
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity'
  ];

  playCheckTimeout;

  constructor(private http: HttpClient) {
    super();

    document.addEventListener('keypress', (e) => {
      console.log(e);
      if (e.charCode === 99 || e.charCode === 67 || e.key === 'C' || e.key === 'c') {
        // on press c/C
        e.preventDefault();
        this.config.settings = !this.config.settings;
        this.config.help = false;
      }

    });
  }


  initSources() {
    const vNumber = 142;
    this.videoSources = [];
    for (let i = 0; i < vNumber; i++) {
      let vName: any = i + 1;
      if (vName < 10) {
        vName = '00' + vName;
      } else if (vName < 100) {
        vName = '0' + vName;
      }
      this.videoSources.push('/assets/videos/all/' + vName + '.mp4');
    }
  }

  configChange() {
    this.saveConfig();
  }

  loadConfig() {
    this.getURL('api/audio-visualisation')
      .subscribe((data) => {
        this.config = data;
      });
  }

  saveConfig() {
    this.postURL('api/audio-visualisation', this.config)
      .subscribe((data) => {
      });
  }

  ngOnInit() {
    this.loadConfig();
    this.config.settings = false;
    this.config.help = true;
    this.started = false;
  }

  initAllSources() {
    this.initSources();
    this.createVideos();
    this.createImages();
    this.createCanvas();
    // this.getYoutubeVideos();
  }

  onStart() {
    this.initAllSources();
    this.randomVideo();
    this.randomCanvasDrawing();
    this.randomImage();
    this.randomCanvasDrawing();
    this.config.help = true;
    this.config.settings = false;
    setTimeout(() => {
      this.config.help = false;
    }, 15000);
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.visualisationContainer.nativeElement.clientWidth;
    this.canvas.height = this.visualisationContainer.nativeElement.clientHeight;
    const canvasDrawings = new CanvasDrawings(this.canvas);
    this.canvasContainer.nativeElement.appendChild(this.canvas);
    canvasDrawings.randomColor();
    this.canvasDrawings = [
      () => {
        canvasDrawings.snowflake(
          2 + Math.round(Math.random() * 5),
          Math.round(Math.random() * this.canvas.width),
          Math.round(Math.random() * this.canvas.height),
          Math.round(Math.random() * 50));
      },
      () => {
        canvasDrawings.star(
          Math.round(Math.random() * this.canvas.width),
          Math.round(Math.random() * this.canvas.height),
          Math.round(4 + (Math.random() * 5)),
          Math.round(Math.random() * this.canvas.width),
          Math.round(Math.random() * this.canvas.width)
        );
      },
      () => {
        canvasDrawings.smiley(
          Math.round(Math.random() * this.canvas.width),
          Math.round(Math.random() * this.canvas.height),
          Math.round(Math.random() * this.canvas.height)
        );
      },
      () => {
        canvasDrawings.peace(
          Math.round(Math.random() * this.canvas.width),
          Math.round(Math.random() * this.canvas.height),
          Math.round(Math.random() * this.canvas.width)
        );
      },
      () => {
        canvasDrawings.heart(
          Math.round(Math.random() * this.canvas.width),
          Math.round(Math.random() * this.canvas.height),
          Math.round(Math.random() * this.canvas.width)
        );
      },
      () => {
        canvasDrawings.randomGender(
          Math.round(Math.random() * this.canvas.width),
          Math.round(Math.random() * this.canvas.height),
          Math.round(Math.random() * this.canvas.width)
        );
      },
      () => {
        canvasDrawings.image(
          '/assets/images/underground-events_white.png',
          Math.round(Math.random() * this.canvas.width),
          Math.round(Math.random() * this.canvas.height),
          Math.round(Math.random() * this.canvas.width)
        );
      },
      () => {
        canvasDrawings.randomColor();
      },
      () => {
        canvasDrawings.clear();
      },
    ];
  }

  randomCanvasDrawing() {
    this.canvas.width = this.visualisationContainer.nativeElement.clientWidth;
    this.canvas.height = this.visualisationContainer.nativeElement.clientHeight;
    this.canvasDrawings[(Math.floor(Math.random() * this.canvasDrawings.length))]();
    this.canvasContainer.nativeElement.style.mixBlendMode = this.randomBlendMode();
  }


  getYoutubeVideos(query: string = 'dancing') {
    const count = 50;
    const API_KEY = 'AIzaSyBGU3CoJhMeS7g499E6de1wE8BVfAUyvls';
    this.getURL('https://www.googleapis.com/youtube/v3/search?key=' + API_KEY + '&maxResults=' + count + '&part=snippet&type=video&q=' + encodeURI(query))
      .subscribe((data) => {
        console.log(data);
      });
  }

  createVideos() {
    for (const source of this.videoSources) {
      this.createVideo(source);
    }

  }

  createVideo(source: string) {
    const video = document.createElement('video');
    video.src = source;
    video.volume = 0;
    video.autoplay = true;
    video.classList.add('visualisation-video');
    video.style.display = 'block';
    video.oncanplay = () => {
      let w = document.body.clientWidth || document.documentElement.clientWidth;
      let h = document.body.clientHeight || document.documentElement.clientHeight;
      if (video.width > video.height) {
        h = (video.height / video.width) * w;
      } else if (video.height > video.width) {
        w = (video.width / video.height) * h;
      }
      video.width = w;
      video.height = h;
      this.videos.push({
        source: source,
        video: video
      });
      if (!this.video) {
        this.randomVideo();
      }
    };

  }

  showVideo(int: number) {
    if (this.video) {
      this.video.pause();
    }
    if (this.videos.length && this.videos[int]) {
      this.video = this.videos[int].video;
      this.video.currentTime = Math.floor(Math.random() * (this.video.duration));

      this.video.play();
      this.mediaContainer.nativeElement.innerHTML = null;
      this.mediaContainer.nativeElement.appendChild(this.video);
    }
    if (this.canvas) {
      this.canvas.width = this.visualisationContainer.nativeElement.clientWidth;
      this.canvas.height = this.visualisationContainer.nativeElement.clientHeight;
    }
  }

  randomVideo() {
    this.showVideo(Math.floor(Math.random() * this.videos.length));
  }

  createImages() {
    for (const source of this.imageSources) {
      this.createImage(source);
    }
  }

  createImage(source: string) {
    const image = document.createElement('img');
    image.src = source;
    image.classList.add('visualisation-image');
    image.style.display = 'block';
    image.onload = () => {
      this.images.push({
        source: source,
        image: image
      });
    };

  }

  showImage(int: number) {
    if (this.images.length && this.images[int]) {
      this.imageContainer.nativeElement.style.transform = 'rotate(0deg) scale(.01)';
      this.imageContainer.nativeElement.innerHTML = null;
      this.imageContainer.nativeElement.style.background = 'url(' + this.images[int].source + ')';
      this.imageContainer.nativeElement.style.backgroundPosition = 'center center';
      this.imageContainer.nativeElement.style.backgroundSize = 'cover';
      this.imageContainer.nativeElement.style.opacity = Math.random();
      this.randomImageRotation();
    }
  }

  randomImage() {
    this.showImage(Math.floor(Math.random() * this.images.length));
  }

  randomImageRotation() {
    const rotation = (Math.random() * 360);
    this.imageContainer.nativeElement.style.transform = 'rotate(' + rotation + 'deg) scale(2)';
  }

  randomBlendMode() {
    return this.blendModes[Math.floor(Math.random() * this.blendModes.length)];
  }

  randomRgba() {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
  }

  randomHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  bounceEffect(value: number = 0) {
    const scale = 1 + value;
    this.visualisationContainer.nativeElement.style.transform = 'scale(' + scale + ') transform(-50%, -50%)';
  }

  borderEffect(value: number = 0) {
    this.visualisationContainer.nativeElement.style.boxShadow = '0 0 ' + (value * 100) + 'px 0 ' + this.randomRgba() + ' inset';
    this.visualisationContainer.nativeElement.style.border = '2px solid ' + this.randomRgba();
  }

  randomCSSFilter() {
    this.filterOverlay.nativeElement.style.background = this.randomRgba();
    this.filterOverlay.nativeElement.style.mixBlendMode = this.randomBlendMode();
  }

  levelChange(level = this.level) {
    this.borderEffect(level);
    if (level - (1 - this.config.filterLevel) >= this.lastLevel || level + (1 - this.config.filterLevel) <= this.lastLevel) {
      this.randomCSSFilter();
    }
    this.bounceEffect(level / 10);
    if (level - (1 - this.config.videoTimeShiftLevel) >= this.lastLevel || level + (1 - this.config.videoTimeShiftLevel) <= this.lastLevel) {
      this.lastLevel = level;
      if (this.video && this.video.duration) {
        const divider = this.video.duration;
        const newTime = this.video.duration / divider + (this.video.duration * this.lastLevel) / divider + (Math.floor(Math.random() * (this.video.duration - (this.video.duration / divider * 2))));
        this.video.currentTime = newTime;
      }
    }
    if (level > 1 - this.config.videoSwitchLevel) {
      this.randomVideo();
    }
    if (level > 1 - this.config.imageSwitchLevel) {
      this.randomImage();
    }
    if (level > 1 - this.config.canvasSwitchLevel) {
      this.randomCanvasDrawing();
    }
    this.checkPlaypack(true);
  }

  checkPlaypack(forcePlay: boolean = false) {
    if (this.playCheckTimeout) {
      clearTimeout(this.playCheckTimeout);
    }
    this.playCheckTimeout = setTimeout(() => {
      if (this.video && this.video.paused && forcePlay) {
        this.video.play();
      }
    }, 250);

  }

  getURL(URL: string) {
    return this.http.get(URL);
  }

  postURL(URL: string, data: any = {}) {
    return this.http.post(URL, data);
  }


}
