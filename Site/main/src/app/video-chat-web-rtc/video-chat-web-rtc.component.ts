import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef, HostListener, Renderer, SecurityContext, ViewEncapsulation, Renderer2, TemplateRef } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { setTimeout, Promise } from 'core-js';

@Component({
  selector: 'app-video-chat-web-rtc',
  templateUrl: './video-chat-web-rtc.component.html',
  styleUrls: ['./video-chat-web-rtc.component.css']
})
export class VideoChatWebRTCComponent implements OnInit {
  @ViewChild('myVideoCtr') myVideoCtr: any;
  @ViewChild('otherUserVideoCtr') otherUserVideoCtr: any;
  error = '';
  info = '';
  peer: any = null;
  myVideo: any;
  otherUserVideo: any;
  myPeerDetails: any = null;
  otherUserPeerDetails: any = null;

  localStream: any;
  myIceServers = [
    {
      "urls": "stun:numb.ca",
    },
    {
      "urls": "turn:numb.viagenie.ca",
      "username": "yanivmail2@gmail.com",
      "credential": "123456"
    }
  ]
  pc1: any; //pc = peer connection
  pc2: any;
  offer: any;
  arrIceCandidates = [];
  arrIceCandidatesMyData = '';
  arrIceCandidatesOtherPCData = '';
  arrIceCandidatesOtherPCDataObj = null;
  constructor() { }

  ngOnInit() {
    this.myVideo = this.myVideoCtr.nativeElement;
    this.otherUserVideo = this.otherUserVideoCtr.nativeElement;
  }

  loadResources() {
    let that = this;
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true
      })
      .then(function (stream) {
        console.log('Received local stream');
        that.myVideo.srcObject = stream;
        that.myVideo.play();
        that.localStream = stream;
      })
      .catch(e => alert(`getUserMedia() error: ${e.name}`));
  }

  getName(pc) {
    return (pc === this.pc1) ? 'pc1' : 'pc2';
  }

  call() {
    const config = {
      iceServers: this.myIceServers
    }
    //var DtlsSrtpKeyAgreement = {
    //  DtlsSrtpKeyAgreement: true
    //};
    //var optional = {
    //  optional: [DtlsSrtpKeyAgreement]
    //};
    let that = this;
    const offerOptions = {
     // offerToReceiveAudio: 1,
      offerToReceiveVideo: 1
    };
    this.pc1 = new RTCPeerConnection(config);
    //this.pc1.onicecandidate = e => this.onIceCandidate(this.pc1, e);

    this.pc1.addEventListener('icecandidate', e => this.onIceCandidate(this.pc1, e));
    this.pc1.onicegatheringstatechange = e => this.gatheringStateChange(this.pc1, e);
    this.pc1.oniceconnectionstatechange = e => this.onIceStateChange(this.pc1, e);
    //this.pc1.ontrack = this.gotRemoteStream;
    //this.pc1.ontrack = e => this.gotRemoteStream(e);
    this.pc1.addEventListener('track', e => this.gotRemoteStream(e));

    this.localStream.getTracks().forEach(track => this.pc1.addTrack(track, this.localStream));
   
    this.pc1.createOffer(offerOptions)
      .then(offer => {
      console.log('offer: ' + offer);
      //that.pc1.setLocalDescription(new RTCSessionDescription(offer)); //now manually go and set in the other browser the remote description
      that.pc1.setLocalDescription(offer);
      console.log('pc1.localDescription' + that.pc1.localDescription);
      let strData = JSON.stringify(that.pc1.localDescription);
      that.myPeerDetails = strData;

     


    }, function (error) { //error
      console.log('Error creating offer: ', error);

    }
      //this.gotDescription ,
      //this.noDescription
    );
  }

  onIceCandidate(pc, event: RTCPeerConnectionIceEvent ) {
    //here we just saving the Ice candidate as array object
    if (event.candidate != null) {
     // let myCandidate = new RTCIceCandidate(event.candidate);
      this.arrIceCandidates.push(event.candidate);
      //this.arrIceCandidates.push(event.candidate);
      this.arrIceCandidatesMyData = JSON.stringify(this.arrIceCandidates);
    }
  }

  onAddIceCandidateSuccess(pc) {
    console.log(`${this.getName(pc)} addIceCandidate success`);
  }

  onAddIceCandidateError(pc, error) {
    console.log(`${this.getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
  }



  gotRemoteStream(e) {
    console.log('gotRemoteStream', e.track, e.streams[0]);
    this.otherUserVideo.srcObject = null;
    this.otherUserVideo.srcObject = e.streams[0];
    this.otherUserVideo.play();
    // reset srcObject to work around minor bugs in Chrome and Edge.
    // remoteVideo.srcObject = null;
    //remoteVideo.srcObject = e.streams[0];
  }

  gatheringStateChange(pc, event) {
    if (pc.iceGatheringState !== 'complete') {
      return;
    }
    //const elapsed = ((window.performance.now() - begin) / 1000).toFixed(3);
    //const row = document.createElement('tr');
    //appendCell(row, elapsed);
    //appendCell(row, getFinalResult(), 7);
    //pc.close();
    //pc = null;
    //gatherButton.disabled = false;
    //candidateTBody.appendChild(row);
  }

  onIceStateChange(pc, event) {
    if (pc) {
      console.log(`${this.getName(pc)} ICE state: ${pc.iceConnectionState}`);
      console.log('ICE state change event: ', event);
    }
  }

  createPC2() {
  
  }

  answer() {

    const config = {
      iceServers: this.myIceServers
    }
    this.pc2 = new RTCPeerConnection(config);
    this.pc2.onicegatheringstatechange = this.gatheringStateChange;
    this.pc2.onicecandidate = e => this.onIceCandidate(this.pc2, e);
    this.pc2.oniceconnectionstatechange = e => this.onIceStateChange(this.pc2, e);
    this.localStream.getTracks().forEach(track => this.pc2.addTrack(track, this.localStream));
    //this.pc2.ontrack = e => this.gotRemoteStream(e);
    this.pc2.addEventListener('track', e => this.gotRemoteStream(e));
   

    let otherUserPeerDetailsObj = JSON.parse(this.otherUserPeerDetails);
    this.pc2.setRemoteDescription(otherUserPeerDetailsObj)
      .then(() => this.pc2.createAnswer())
      .then(answer => {
        console.log('answer: ' + answer)
        //console.log('this.pc2.localDescription: ' + this.pc2.localDescription)

        let strData = JSON.stringify(answer);
        this.myPeerDetails = strData;

        //this.pc2.setLocalDescription(new RTCSessionDescription(answer));
        this.pc2.setLocalDescription(answer);

       

      }).then(() => this.onSetLocalSuccess(this.pc2), this.onSetSessionDescriptionError)


  }


  onSetLocalSuccess(pc) {
    console.log(`${this.getName(pc)} setLocalDescription complete`);
  }

  onSetSessionDescriptionError(error) {
    console.log(`Failed to set session description: ${error.toString()}`);
  }

  onCreateSessionDescriptionError(error) {
    console.log(`Failed to create session description: ${error.toString()}`);
  }

  connect() {
    let otherPeerDetailsObj = JSON.parse(this.otherUserPeerDetails);
    this.pc1.setRemoteDescription(otherPeerDetailsObj)
      .then(() => this.onSetRemoteSuccess(this.pc1), this.onSetSessionDescriptionError);
  }

  onSetRemoteSuccess(pc) {
    console.log(`${this.getName(pc)} setRemoteDescription complete`);
  }

  createIceCandiatesObject() {
    if (this.arrIceCandidatesOtherPCData != null && this.arrIceCandidatesOtherPCData.length > 0) {
      this.arrIceCandidatesOtherPCDataObj  = JSON.parse(this.arrIceCandidatesOtherPCData);
      
    }
    return null;
  }

  loadCandidate(candidate, pc) {
    //let candidate = new RTCIceCandidate(candidateStr);
    if (candidate != null  && candidate!=undefined) {
      pc.addIceCandidate(candidate)
        .then(() => this.onAddIceCandidateSuccess(pc), err => this.onAddIceCandidateError(pc, err));
      console.log(`${this.getName(pc)} ICE candidate:\n${candidate ? candidate.candidate : '(null)'}`);
    }
  }

}
