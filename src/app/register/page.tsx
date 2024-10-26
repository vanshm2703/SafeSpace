'use client'
import { useState, useEffect } from 'react';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import './register.css'
import Globe from '../Footer/Globe';

export default function Register() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGlobeVisible, setIsGlobeVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsGlobeVisible(window.innerWidth > 768); // Adjust threshold as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  async function handleRegister (e:any) {
    try {
        e.preventDefault();
        setIsLoading(true);
        console.log("Name:", name);
        const resp = await axios.post("/api/users/register",{name,email,password});
        toast.success("SignUp Success")
        router.push("/login");
      
    } catch (error:any) {
        console.log("Signup failed ",error.response.data);
        toast.error("SignUp Failed", error);
      } finally {
        setIsLoading(false); 
    }
  }


  return (
    <>
        <Toaster
  toastOptions={{
    success: {
      iconTheme: {
        primary: 'rgb(11, 218, 81)',
        secondary: 'black',
      },
      style: {
        background: 'rgb(11, 218, 81)',
      },
    },
    error: {
        iconTheme: {
            primary: '#ff0033',
            secondary: 'black',
          },
      style: {
        background: '#ff0033',
      },
    },
  }}
/>
    
    <div className={`container min-h-screen flex bg-gradient-to-r from-gray-950 via-gray-700 to-gray-950 overflow-hidden ${isGlobeVisible ? 'h-screen' : 'items-center justify-center'}`}>
      {/* Left Side: Registration Form */}
      <div className={`flex items-center justify-center w-1/2 ${isGlobeVisible ? '' : 'h-full'}`}>
        <div className="text-white backdrop-blur-3xl p-8 rounded-lg w-96 border border-gray-700">
          <div className="flex justify-center mb-6">
            {/* Add your logo here */}
          </div>

          <h2 className="text-center text-3xl font-semibold">Women Safety</h2>
          <p className="text-center text-gray-400 mb-8">Welcome!</p>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full p-2.5 border border-gray-600 bg-gray-800 rounded-lg text-white"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="w-full p-2.5 border border-gray-600 bg-gray-800 rounded-lg text-white"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="w-full p-2.5 border border-gray-600 bg-gray-800 rounded-lg text-white"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button 
            onClick={handleRegister} 
            className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold py-2 rounded-lg`} 
            disabled={isLoading}
          >
              {isLoading ? 'Loading...' : 'Register'}
          </button>

          <div className="text-center text-gray-400 mt-4">
            Have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">Sign in</a>
          </div>
        </div>
      </div>

      {/* Right Side: Globe */}
      <div className={`w-1/2 flex items-center justify-center relative h-screen ${isGlobeVisible ? '' : 'hidden'}`}>
        <Globe className="globe" isVisible={isGlobeVisible} />
      </div>
    </div>

    </>
  );
}
