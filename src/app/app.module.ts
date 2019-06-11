import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AudioVisualisationComponent } from './components/audio-visualisation/audio-visualisation.component';
import { AudioVisualisationVideoComponent } from './components/audio-visualisation-video/audio-visualisation-video.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AudioVisualisationComponent,
    AudioVisualisationVideoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
