'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
// import Image from 'next/image';
import Globe from '../Footer/Globe';
import './login.css'

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [isGlobeVisible, setIsGlobeVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsGlobeVisible(window.innerWidth > 768); // Adjust threshold as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  async function handleLogin(e:any){
    try {
        e.preventDefault();
        setIsLoading(true);
        const resp = await axios.post("/api/users/login",{email,password});
        // console.log("response: axios: ",resp)
        const {success} = resp.data;
        localStorage.setItem('loggin',JSON.parse(success));
        toast.success("LogIn Successful");
        console.log(name);
        router.push("/home");
    } catch (error:any) {
        console.log("Signup failed ",error.response.data);
        toast.error("SignUp Failed", error);
    } finally{
        setIsLoading(true);
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
      <div className={`container min-h-screen flex bg-gradient-to-r from-gray-950 via-gray-800 to-gray-950 overflow-hidden ${isGlobeVisible ? 'h-screen' : 'items-center justify-center'}`}>
        <div className={`flex items-center justify-center w-1/2 ${isGlobeVisible ? '' : 'h-full'}`}>
          <div className="text-white p-8 rounded-lg backdrop-blur-md w-96 bg border border-gray-700">
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
              onClick={handleLogin}
              className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold py-2 rounded-lg`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>

            <div className="text-center text-gray-400 mt-4">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
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
