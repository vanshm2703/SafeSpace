// pages/api/initiateCall.js
import { NextResponse } from 'next/server';
import { RTCPeerConnection } from 'webrtc';

export async function POST(req) {


    try {
        const { phoneNumber, offer } = req.body;

    // Generate a proper fingerprint
    const fingerprint = '8A:0D:E5:F2:74:73:C3:B3:79:95:D4:B3:8D:99:B3:1F:05:79:B9:B6:6C:5D:B3:9C:E9:44:D3:15:D9:29:78:6B';

    // Create a proper SDP answer
    const answer = {
      type: 'answer',
      sdp: `v=0
o=- ${Date.now()} 2 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0
a=msid-semantic: WMS
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
c=IN IP4 0.0.0.0
a=rtcp:9 IN IP4 0.0.0.0
a=ice-ufrag:${Math.random().toString(36).substr(2, 8)}
a=ice-pwd:${Math.random().toString(36).substr(2, 24)}
a=ice-options:trickle
a=fingerprint:sha-256 ${fingerprint}
a=setup:active
a=mid:0
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:3 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
a=sendrecv
a=rtcp-mux
a=rtpmap:111 opus/48000/2
a=rtcp-fb:111 transport-cc
a=fmtp:111 minptime=10;useinbandfec=1
a=rtpmap:103 ISAC/16000
a=rtpmap:104 ISAC/32000
a=rtpmap:9 G722/8000
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
a=rtpmap:106 CN/32000
a=rtpmap:105 CN/16000
a=rtpmap:13 CN/8000
a=rtpmap:110 telephone-event/48000
a=rtpmap:112 telephone-event/32000
a=rtpmap:113 telephone-event/16000
a=rtpmap:126 telephone-event/8000
a=ssrc:1001 cname:${Math.random().toString(36).substr(2, 16)}`
    };

        return NextResponse.json({ 
          success: true, 
          message: 'Call initiated successfully',
          answer: simulatedAnswer
        });
      } catch (error) {
        // console.error('Error initiating call:', error);
        return NextResponse.json({ 
          success: false, 
          error: error.message 
        });


   }}