'use client';
import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import axios from 'axios';

const LocationFinder = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [sendingSms, setSendingSms] = useState(false);
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);
  const [log, setLog] = useState(true);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('loggin');
    setLog(!!storedUser);
    getLocation(); // Automatically get location on mount
  }, []);

  const handleProfileClick = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      localStorage.removeItem('loggin');
      setLog(false);
      setShowLogoutMenu(false);
      router.push("/login");
    } catch (error) {
      console.log("Logout Error: ", error.message);
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    marginTop: '20px',
    borderRadius: '8px',
  };

  const sendLocationViaSMS = async (locationData) => {
    setSendingSms(true);
    try {
      const response = await fetch('api/users/sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: locationData.lat,
          longitude: locationData.lng,
          timestamp: locationData.timestamp,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSmsSent(true);
      } else {
        throw new Error(data.error || 'Failed to send SMS');
      }
    } catch (error) {
      setError(`Failed to send SMS: ${error.message}`);
    } finally {
      setSendingSms(false);
    }
  };

  const getLocation = () => {
    setLoading(true);
    setError(null);
    setSmsSent(false);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toLocaleString(),
        };
        setLocation(newLocation);
        
        // Send SMS immediately after getting location
        await sendLocationViaSMS(newLocation);
        
        setLoading(false);
      },
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const handleError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("You denied the request for location access.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      default:
        setError("An unknown error occurred.");
        break;
    }
    setLoading(false);
  };

  const onLoad = useCallback((map) => {
    console.log('Map loaded');
  }, []);

  return (
    <div className="relative bg-gray-900 min-h-screen flex items-center justify-center">
      {/* Blurred Colored Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 opacity-40 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-400 opacity-40 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 opacity-40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-yellow-300 opacity-50 rounded-full filter blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white space-y-8 p-6 max-w-4xl w-full">
        <nav className="flex justify-between items-center p-6 bg-black rounded-lg">
          <a href={'/home'} className="text-xl font-bold">Women Safety</a>
          <ul className="flex space-x-6">
            <li><a href="/aiTry" className="hover:text-gray-400">Law</a></li>
            <li><a href="/policyMail" className="hover:text-gray-400">Policy</a></li>
            <li><a href="/voiceHelpss" className="bg-red-500 p-2 border rounded-md hover:text-red-900">SOS</a></li>
          </ul>
          <div className="flex items-center">
            {log ? (
              <>
                <span className="mr-4">Welcome</span>
                <div style={{ cursor: "pointer" }} onClick={handleProfileClick} className='bg-gray-700 flex justify-center items-center rounded-full h-12 w-12'>
                  <AccountCircleOutlinedIcon className="scale-150" />
                </div>
                {showLogoutMenu && (
                  <div className="absolute bg-black border overflow-hidden border-gray-300 rounded-md mt-2">
                    <button onClick={handleLogout} className="px-3 py-2 text-white hover:bg-gray-800">
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button className="px-4 py-2 bg-white text-black rounded-md">Start</button>
            )}
          </div>
        </nav>

        <div className="p-4 max-w-4xl mx-auto">
          <div className="mb-4">
            <button
              onClick={getLocation}
              disabled={loading || sendingSms}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full text-xl disabled:bg-gray-400 shadow-lg"
            >
              {loading ? 'Getting Location...' : 
               sendingSms ? 'Sending Emergency Alert...' : 
               'SEND EMERGENCY ALERT'}
            </button>
          </div>

          {error && (
            <div className="text-red-500 mb-4 p-2 bg-red-100 rounded">
              Error: {error}
            </div>
          )}

          {smsSent && (
            <div className="text-green-500 mb-4 p-2 bg-green-100 rounded">
              Emergency alert sent successfully!
            </div>
          )}

          {location && (
            <div className="space-y-4">
              <div className="text-white bg-gray-800 bg-opacity-70 px-4 py-6 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Your Location:</h2>
                <p>Latitude: {location.lat}</p>
                <p>Longitude: {location.lng}</p>
                <p>Accuracy: {location.accuracy} meters</p>
                <p>Timestamp: {location.timestamp}</p>
              </div>

              <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={location}
                  zoom={15}
                  onLoad={onLoad}
                >
                  <Marker
                    position={location}
                    title="Your Location"
                  />
                </GoogleMap>
              </LoadScript>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationFinder;
