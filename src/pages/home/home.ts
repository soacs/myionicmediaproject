import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  recording: boolean = false;
  duration: number;

  file: MediaObject = this.media.create('file.mp3');
  // Recording to a file
  //file: MediaObject = this.media.create('path/to/file.mp3');

  constructor(public navCtrl: NavController, private media: Media) {
   // this.file.onStatusUpdate.subscribe(status => console.log(status));
   // this.file.onSuccess.subscribe(() => console.log('Action is successful'));
   // this.file.onError.subscribe(error => console.log('Error!', error));
  }

  play() {
    this.file.play();
  }

  pause(){
    this.file.pause();
  }

  getCurrentPosition(){
    this.file.getCurrentPosition().then((position) => {
          console.log(position);
        });
  }

  getDuration(){
      this.duration = this.file.getDuration();
      console.log(this.duration);
  }

  skipTenSecnds(){
     this.file.seekTo(10000);
  }

 release() {
    // release the native audio resource
    // Platform Quirks:
    // iOS simply create a new instance and the old one will be overwritten
    // Android you must call release() to destroy instances of media when you are done
   this.file.release();
 }

 startRecording(){
   this.file.startRecord();

   this.recording = true;
 }

  stopRecording() {
    this.file.stopRecord();
    this.recording = false;
  }

}
