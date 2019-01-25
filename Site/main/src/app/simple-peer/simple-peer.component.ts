import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef, HostListener, Renderer, SecurityContext, ViewEncapsulation, Renderer2, TemplateRef} from '@angular/core';
import { fillProperties } from '@angular/core/src/util/property';

@Component({
  selector: 'app-simple-peer',
  templateUrl: './simple-peer.component.html',
  styleUrls: ['./simple-peer.component.css']
})
export class SimplePeerComponent implements OnInit {
  @ViewChild('myVideoCtr') myVideoCtr: any;
  @ViewChild('otherUserVideoCtr') otherUserVideoCtr: any;


  peer: any = null;
  myVideo: any;
  otherUserVideo: any;
  myPeerDetails: any = null;
  otherUserPeerDetails: any = null;
  isInitiator = true;
  myIceServers = [
    {
      "urls": "stun:numb. .ca",
    },
    {
      "urls": "turn:numb.viagenie.ca",
      "username": "yanivmail2@gmail.com",
      "credential": "123456"
    }
  ]
  constructor() { }

  ngOnInit() {
    this.myVideo = this.myVideoCtr.nativeElement;
    this.otherUserVideo = this.otherUserVideoCtr.nativeElement;
  }


  loadResources() { //isInitiator = true, location.hash === '#init'  //isInitiator: boolean = true
    let myVideo = this.myVideo;
    let otherUserVideo = this.otherUserVideo;
    //let peerx: any;
    let that = this;
    //this.n.getUserMedia = (this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.msGetUserMedia);
    //this.n.getUserMedia({ video: true, audio: false }, function (stream) {
    var browser = <any>navigator;
    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    
    browser.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => { 
      console.log("Inside getUserMedia");
      //peerx = new SimplePeer({
      that.peer = new SimplePeer({
        //that.peer = new Peer({

        initiator: that.isInitiator,
        stream: stream,
        reconnectTimer: 3000,
        iceTransportPolicy: 'any',// 'relay',any
        trickle: false,
        config: {
          iceServers: [
            {
              "urls": "stun:numb.viagenie.ca"
            },
            {
              "urls": "turn:numb.viagenie.ca",
              "username": "yanivmail2@gmail.com",
              "credential": "123456"
            }
          ]
        }

        //,
        //config: 
        //  {
        //    iceServers:
        //      that.myIceServers
        //  }
      });
      //console.log("peerx: " + peerx)
      console.log("peer: " + that.peer)
      //that.peer = peerx;


      //peerx.on('signal', function (data) {
      that.peer.on('signal', function (data) {

        
        if (that.isInitiator == false && data.renegotiate) {
          console.log("Renegotiate, wait to next round");
          return;
        }
        let person = that.isInitiator ? 'Caller' : 'Receiver';
        console.log('getting at last the signal id for' + person);
        let strData = JSON.stringify(data);
        console.log(strData);
        that.myPeerDetails = strData;
        //console.log('replace profile-level-id');
        //strData = strData.replace(/420029/g, "42e01f") //this is replace all in regular expression
        //strData = strData.replace(/42001f/g, "42e01f")
        //data = JSON.parse(strData);


        
        
        
        

      })

      //peerx.on('connect', function () {
      that.peer.on('connect', function () {
        console.log('You are connected!!!')
        that.myVideo.srcObject = stream; //https://stackoverflow.com/questions/49628595/capture-from-webcamera-html
        that.myVideo.play();
      })

      //peerx.on('error', function (f) {
      that.peer.on('error', function (f) {
        console.log('*****************************error in peer*****************************,' + f.message)
      })
      that.peer.on('close', function () {
        console.log('Close has been fired')
      })




      that.peer.on('data', function (data) { //Send text/binary data to the remote peer. data can be any of several types: String, Buffer
        //let str = data.toString('utf8');
        //console.log('Recieved message:' + data);
        //if (str == 'play') { //other user want to play his video
        //  //that.otherUserVideo.play();
        //  that.playVideoData(that.otherUserVideo);
        //}
        //else if (str == 'stop') { //other user want to stop his video
        //  that.stopVideoData(that.otherUserVideo);
        //}
      })

     

      //peerx.on('stream', function (stream) {
      that.peer.on('stream', function (stream) {
        //   if (stream.active) {

        console.log("Stream is " + stream.active);
      //  if (stream.active) {
          //that.otherUserVideo.srcObject = null //added to fix chrome bug.
          that.otherUserVideo.srcObject = stream;
          that.otherUserVideo.play();
       // }
        
      })

    

     

    }).catch(err => {
      let friendlyError = '';
      console.log("Error video: " + err); //https://addpipe.com/blog/common-getusermedia-errors/
      /* handle the error */
      if (err.name == "NotFoundError" || err.name == "DevicesNotFoundError") {
        friendlyError = "Please check that your web camera is connected";
        //required track is missing
      } else if (err.name == "NotReadableError" || err.name == "TrackStartError") {
        friendlyError = "Your camera is already connected to another device or another browser, try again or check your camera device, sometimes disconnect and reconnect the camera can help";
        //webcam or mic are already in use
      } else if (err.name == "OverconstrainedError" || err.name == "ConstraintNotSatisfiedError") {
        //constraints can not be satisfied by avb. devices
      } else if (err.name == "NotAllowedError" || err.name == "PermissionDeniedError") {
        friendlyError = "Permission denied in browser, check your browser setting";
        //permission denied in browser
      } else if (err.name == "TypeError" || err.name == "TypeError") {
        //empty constraints object
        friendlyError = "Connection error in object, " + err.message;
      } else {
        //other errors
        friendlyError = "Connection error, " + err.message; //still need to raise the error and try again.
      }
      if (friendlyError != '') {
        console.log(friendlyError);

      }



      });

  }

  connect() {
    let otherPeerId = JSON.parse(this.otherUserPeerDetails);
    this.peer.signal(otherPeerId);
  }
  
}

