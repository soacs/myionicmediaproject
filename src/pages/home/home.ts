import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Media, MediaObject} from '@ionic-native/media';
import {File} from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  recording: boolean = false;
  duration: number;
  items;
  audio: MediaObject;
  mediaDirectory: string;
  fileName: string = "myfile.3gp";
  filePath: string;
  position: string;

  constructor(public navCtrl: NavController, private media: Media, public platform: Platform, public file: File) {


    this.file.checkDir(this.file.dataDirectory, 'mydir').then(() => console.log('Directory mydir already exists')).catch(err => {
        console.log('Directory mydir does not exist, calling createDir...');
        this.file.createDir(this.file.dataDirectory, "mydir", false).then(() => {
          console.log("we just created the directory mydir");
        }).catch((err) => {
          console.error("error trying to create directory mydir", err);
        });
      }
    );

    this.mediaDirectory = this.file.dataDirectory + "mydir/";
    this.filePath = this.mediaDirectory + this.fileName;

    console.log("this.file.dataDirectory = " + this.file.dataDirectory);
    console.log("this.mediaDirectory = " + this.mediaDirectory);
    console.log("this.filePath = " + this.filePath);


  }

  listDirItems() {
    this.listDir(this.file.dataDirectory, "mydir");
  }

  listDir = (path, dirName) => {
    this.file.listDir(path, dirName).then((entries) => {
      this.items = entries;
      console.log("Directory Items = " + JSON.stringify(this.items));
    }).catch(this.handleError);
  }

  handleError = (error) => {
    console.log('error reading,', error)
  };

  play() {
    console.log("Play audio");
    this.audio.play();
  }

  pause() {
    console.log("Pause audio");
    this.audio.pause();
  }

  getCurrentPosition() {
    this.audio.getCurrentPosition().then((position) => {
      console.log(position);
    });
  }

  getDuration() {
    console.log("Get audio duration");
    this.duration = this.audio.getDuration();
    console.log("Audio Duration: " + this.duration);
  }

  skipTenSecnds() {
    this.audio.seekTo(10000);
  }

  release() {
    // release the native audio resource
    // Platform Quirks:
    // iOS simply create a new instance and the old one will be overwritten
    // Android you must call release() to destroy instances of media when you are done
    this.audio.release();
  }

  startRecording() {
    //this.file.createFile(this.file.dataDirectory + "mydir", 'myfile.3gp', true);
    // Recording to a file
    console.log("Start recording to file path named: " + this.filePath);
    this.audio = this.media.create(this.filePath);
    this.audio.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    this.audio.onSuccess.subscribe(() => console.log('Action is successful'));
    this.audio.onError.subscribe(error => console.log('Error!', error));
    this.audio.startRecord();
    this.recording = true;
    this.listDir(this.file.dataDirectory, "mydir");
  }

  stopRecording() {
    console.log("Stop recording to file path named: " + this.filePath);
    this.audio.stopRecord();
    this.audio.release();
    this.recording = false;
  }

  playM4A() {
       //let mp3URL = getMediaURL("http://angularorange.io/test.m4a");
       let media = this.media.create('http://angularorange.io/test.m4a');

    media.play();
   }

   mediaError(e) {
  console.log('Media Error');
     console.log(JSON.stringify(e));
}

}
