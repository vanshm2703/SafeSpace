// 'use client'
// import { useState, useEffect } from 'react';
// import styles from './CallButton.module.css';
// import axios from 'axios';

// const CallButton = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [callStatus, setCallStatus] = useState('');
//   const [peerConnection, setPeerConnection] = useState(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined' && window.RTCPeerConnection) {
//       const pc = new RTCPeerConnection({
//         iceServers: [
//           {
//             urls: 'stun:stun.l.google.com:19302'
//           }
//         ]
//       });

//       pc.onicecandidate = event => {
//         if (event.candidate) {
//           console.log('New ICE candidate:', event.candidate);
//         }
//       };

//       pc.onconnectionstatechange = event => {
//         console.log('Connection state:', pc.connectionState);
//       };

//       setPeerConnection(pc);

//       // Cleanup on unmount
//       return () => {
//         pc.close();
//       };
//     }
//   }, []);

//   const initiateCall = async () => {
//     if (!peerConnection) {
//       setCallStatus('WebRTC not supported in this browser');
//       return;
//     }

//     try {
//       // Create audio track
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       stream.getTracks().forEach(track => {
//         peerConnection.addTrack(track, stream);
//       });

//       // Create offer
//       const offer = await peerConnection.createOffer({
//         offerToReceiveAudio: true,
//         offerToReceiveVideo: false
//       });
//       await peerConnection.setLocalDescription(offer);

//       // Wait for ICE gathering to complete
//       await new Promise(resolve => {
//         if (peerConnection.iceGatheringState === 'complete') {
//           resolve();
//         } else {
//           const checkState = () => {
//             if (peerConnection.iceGatheringState === 'complete') {
//               peerConnection.removeEventListener('icegatheringstatechange', checkState);
//               resolve();
//             }
//           };
//           peerConnection.addEventListener('icegatheringstatechange', checkState);
//         }
//       });

//       const response = await axios.post('/api/users/callService', {
//         phoneNumber,
//         offer: peerConnection.localDescription
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       const data = response.data;
      
//       if (data.success) {
//         if (data.answer) {
//           await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
//           setCallStatus('Call connected successfully!');
//         }
//       } else {
//         setCallStatus('Failed to initiate call.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setCallStatus('Error: ' + (error.response?.data?.message || error.message));
      
//       // Cleanup on error
//       stream?.getTracks().forEach(track => track.stop());
//     }
//   };

//   const handleCall = async (e) => {
//     e.preventDefault();
//     setCallStatus('Initiating call...');
//     await initiateCall();
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleCall}>
//         <input
//           type="tel"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           placeholder="Enter phone number"
//           pattern="[0-9]{10}"
//           required
//           className={styles.input}
//         />
//         <button type="submit" className={styles.button}>
//           Call Now
//         </button>
//       </form>
//       {callStatus && <p className={styles.status}>{callStatus}</p>}
//     </div>
//   );
// };

// export default CallButton;