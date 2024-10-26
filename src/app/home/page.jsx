'use client'
// import '../globals.css';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Button from '../components/Button';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CardHover from '../components/CardHover/CardHover';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Toaster, toast } from 'react-hot-toast';
import {
  Twitter,
  Facebook,
  Instagram,
  Github,
  Link,
  Mail,
  Linkedin,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);
  const [log, setLog] = useState(true);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);


  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  function buttonHandle(){
    router.push('/login');
  }

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'College Student',
      testimonial:
        "SafeSpace AI has given me the confidence to walk home after late-night study sessions. It's like having a guardian angel in my pocket.",
      image: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: 'Michael Chen',
      role: 'Community Volunteer',
      testimonial:
        "As a SafeSpace AI community member, I feel empowered to make a real difference in my neighborhood's safety. It's brought us all closer together.",
      image: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Working Professional',
      testimonial:
        "The peace of mind SafeSpace AI provides is priceless. I feel safer knowing help is just a button press away.",
      image: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
  ];

  const faqs = [
    {
      color: 'purple',
      question: 'How does SafeSpace AI work?',
      answer:
        'SafeSpace AI uses a combination of community networking and AI technology to provide immediate assistance in case of emergencies. When you activate the help button, nearby community members are alerted, and your location is shared securely to facilitate quick response.',
    },
    {
      color: 'blue',
      question: 'Is my personal information safe with SafeSpace AI?',
      answer:
        'Absolutely. We take your privacy seriously. All personal data is encrypted and stored securely. Location sharing is only activated during emergencies and with your consent.',
    },
    {
      color: 'pink',
      question: "Can I use SafeSpace AI in areas where I don't know anyone?",
      answer:
        "Yes! SafeSpace AI connects you with a network of community members, even in unfamiliar areas. The app's effectiveness grows as more people in an area join the network.",
    },
    {
      color: 'yellow',
      question: 'How can I become a community responder?',
      answer:
        'To become a community responder, simply sign up for an account and complete our brief online safety training. You\'ll then be able to receive and respond to alerts in your area.',
    },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem('loggin');
    setLog(storedUser ? true : false);
  }, []);

  // const toggleAccordion = (index) => {
  //   setOpenIndex(openIndex === index ? null : index);
  // };


  const handleProfileClick = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  const handleLogout = async (e) => {
    try {
      await axios.get('/api/users/logout');
      localStorage.removeItem('loggin');
      setLog(false);
      setShowLogoutMenu(false);
      router.push("/login");
    } catch (error) {
      console.log("Logout Error: ", error.message);
      toast.error("Logout Error");
    }
  };
  
  

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

      <div className="relative bg-black min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-[-100px] w-[600px] h-[400px] bg-purple-500 opacity-40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-blue-500 opacity-30 rounded-full filter blur-3xl"></div>
        <div className="absolute top-[20%] right-0 w-[300px] h-[300px] bg-pink-500 opacity-25 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-[25%] left-[15%] w-[350px] h-[350px] bg-green-400 opacity-20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <nav className="flex justify-between items-center p-6 text-white">
          <div className="text-xl font-bold">Women Safety</div>
            <ul className="flex space-x-6">
              <li><a href="#features" className="hover:text-gray-400">Features</a></li>
              <li><a href="#how" className="hover:text-gray-400">How It Works</a></li>
              <li><a href="/aiTry" className="hover:text-gray-400">Law</a></li>
              <li><a href="/policyMail" className="hover:text-gray-400">Policy</a></li>
              <li><a href="/voiceHelp" className="bg-red-500 p-2 border rounded-md hover:text-red-900">SOS</a></li>
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
                <>
                  {/* <button */}
                    {/* onClick={() => setIsSheetOpen(true)}
                    className="px-4 py-2 bg-white text-black rounded-md" */}
                  {/* > */}
                    <Button>Start</Button>
                    
                  {/* </button> */}
                </>
              )}
            </div>
          </nav>

          <section className="flex flex-col lg:flex-row justify-between items-center mt-16 mb-16 px-10 py-20">
            <div className="text-white lg:w-1/2 space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold">
                Empowering You to Walk Without Fear
              </h1>
              <p className="text-xl">
                SafeSpace AI: Your personal safety network powered by community and AI technology.
              </p>
              <button onClick={buttonHandle} className="px-6 py-3 bg-blue-600 text-white rounded-md mt-4">
                Join SafeSpace Today
              </button>

              <div className="flex items-center space-x-4 mt-6">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-500"><img src={"https://randomuser.me/api/portraits/women/51.jpg"} /></div>
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-500"><img src={"https://randomuser.me/api/portraits/men/4.jpg"} /></div>
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-500"><img src={"https://randomuser.me/api/portraits/women/9.jpg"} /></div>
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-500"><img src={"https://randomuser.me/api/portraits/women/52.jpg"} /></div>
                </div>
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-gray-400">10k+ users feeling safer</span>
              </div>
            </div>

            <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center items-center">
              <div className="w-[400px] h-[300px] rounded-lg overflow-hidden opacity-90">
                <img src={"https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/4X0rnC-womensafety-Sjhw"} />
              </div>
            </div>
          </section>
        </div>
      </div>


<div className="relative bg-black min-h-screen flex items-center justify-center">
  <div className="w-full max-w-3xl mx-auto mt-28 mb-28 p-4 bg-black text-white">
    <h2 className="text-3xl font-bold mb-6">Your Safety Questions Answered</h2>
    <p className="mb-8">Learn more about how SafeSpace AI works to keep you protected</p>
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="rounded-lg border border-gray-500 overflow-hidden">
          <button
            className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 focus:outline-none transition duration-300 ease-in-out"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">{faq.question}</span>
              <span>{openIndex === index ? '-' : '+'}</span>
            </div>
          </button>
          <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
              openIndex === index ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <div className="p-4 bg-gray-900 text-sm">
              <p>{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>




    <div className="relative bg-gray-900 min-h-screen flex items-center justify-center">
      
      {/* Blurred Colored Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 opacity-40 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-400 opacity-40 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 opacity-40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-yellow-300 opacity-50 rounded-full filter blur-2xl"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center text-white space-y-8">
        <h1 className="text-4xl font-bold">81% of Women Have Experienced Harassment</h1>
        <p className="text-lg">It's time for a change. Join us in making public spaces safer for everyone.</p>

        {/* Features Section */}
        <div className="space-y-4">
      <div className="p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-70">
        <h2 className="text-2xl font-semibold text-white">Feeling vulnerable in public spaces</h2>
      </div>
      <div className="p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-70">
        <h2 className="text-2xl font-semibold text-white">Walking alone at night</h2>
      </div>
      <div className="p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-70">
        <h2 className="text-2xl font-semibold text-white">Unsure how to get help quickly</h2>
      </div>
    </div>


        <div className="mt-8">
          <button onClick={buttonHandle} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>

  <div  className="bg-black min-h-screen text-white">
      {/* Section Heading */}
      <section id="how" className="py-16 text-center">
        <h2 className="text-4xl font-bold">Your Journey to a Safer Community Starts Here</h2>
      </section>

      {/* Steps Section */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Step 1 */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">1</span>
            </div>
            <div className="ml-6">
              <h4 className="text-lg font-bold">Download & Sign Up</h4>
              <p className="text-gray-400">Get the SafeSpace AI app and create your secure account.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">2</span>
            </div>
            <div className="ml-6">
              <h4 className="text-lg font-bold">Set Up Your Network</h4>
              <p className="text-gray-400">
                Connect with local community members and add emergency contacts.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">3</span>
            </div>
            <div className="ml-6">
              <h4 className="text-lg font-bold">Activate When Needed</h4>
              <p className="text-gray-400">
                In case of emergency, press the help button to alert your network.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">4</span>
            </div>
            <div className="ml-6">
              <h4 className="text-lg font-bold">Receive Immediate Support</h4>
              <p className="text-gray-400">
                Nearby community members are notified and can provide assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div className="relative bg-black text-white min-h-screen overflow-hidden">

  {/* Blurred Colored Shapes */}
  <div className="absolute top-0 left-0 w-full h-full">
    {/* Large Teal Oval */}
    <div className="absolute top-1/4 left-12/3 w-[500px] h-[300px] bg-teal-400 opacity-50 rounded-full filter blur-[120px]"></div>

    {/* Smaller Orange Circle */}
    <div className="absolute top-10 right-10 w-[150px] h-[150px] bg-orange-400 opacity-60 rounded-full filter blur-[60px]"></div>

    {/* Large Red Rectangle */}
    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[200px] bg-red-500 opacity-40 rounded-lg filter blur-[100px]"></div>

    {/* Purple Triangle-like Shape */}
    <div className="absolute bottom-10 right-1/3 w-[250px] h-[250px] bg-purple-500 opacity-60 transform rotate-45 filter blur-[80px]"></div>

    {/* Small Blue Circle */}
    <div className="absolute bottom-20 left-1/3 w-[100px] h-[100px] bg-blue-400 opacity-80 rounded-full filter blur-[50px]"></div>
  </div>

  {/* Main Content */}
  <div className="relative z-10">
    {/* Section Heading */}
    <section id="features" className="text-center py-16">
      <h2 className="text-4xl font-bold">Cutting-Edge Features for Unparalleled Safety</h2>
      <p className="text-lg text-gray-400 mt-4">
        Discover how SafeSpace AI revolutionizes personal security with these powerful tools
      </p>
    </section>

    {/* Features Grid */}
    <section className="py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        
        {/* Feature 1 */}
        <div className="flex items-start space-x-4">
          <div className="rounded-full flex items-center justify-center w-10 h-10 p-3 text-white">
            <ErrorOutlineOutlinedIcon className="h-8 scale-55 w-8"/>
            </div>
          <div>
            <h4 className="text-xl font-semibold">Instant Alert System</h4>
            <p className="text-gray-400">
              Send immediate distress signals to nearby community members with just one tap.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-start space-x-4">
        <div className="rounded-full flex items-center justify-center w-10 h-10 p-3 text-white">
          <Diversity3Icon className="h-10 scale-75 w-10"/>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Community Network</h4>
            <p className="text-gray-400">
              Connect with a network of local allies ready to provide assistance when you need it most.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-start space-x-4">
        <div className="rounded-full flex items-center justify-center w-10 h-10 p-3 text-white">
          <ExploreOutlinedIcon className="h-25 w-25 scale-150"/>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Real-time Location Tracking</h4>
            <p className="text-gray-400">
              Share your location securely with trusted contacts for enhanced safety.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex items-start space-x-4">
        <div className="rounded-full flex items-center justify-center w-10 h-10 p-3 text-white">
          <LightbulbOutlinedIcon className="h-25 w-25 scale-150"/>
          </div>
        <div>
            <h4 className="text-xl font-semibold">AI-Powered Risk Assessment</h4>
            <p className="text-gray-400">
              Utilize LLaMA AI to analyze surroundings and provide safety recommendations.
            </p>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="flex items-start space-x-4">
        <div className="rounded-full flex items-center justify-center w-10 h-10 p-3 text-white">
          <HealthAndSafetyOutlinedIcon className="h-25 w-25 scale-150"/>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Safety Resources</h4>
            <p className="text-gray-400">
              Access a comprehensive database of safety tips, emergency contacts, and local resources.
            </p>
          </div>
        </div>

        {/* Feature 6 */}
        <div className="flex items-start space-x-4">
        <div className="rounded-full flex items-center justify-center w-10 h-10 p-3 text-white">
          <FavoriteBorderOutlinedIcon className="h-25 w-25 scale-150"/>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Empowerment Through Unity</h4>
            <p className="text-gray-400">
              Join a movement dedicated to creating safer public spaces for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>







<section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-28 mb-20">
          <h2 className="text-4xl font-bold text-white">
            Real Stories of Safety and Empowerment
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            See how SafeSpace AI is changing lives and building stronger, safer
            communities
          </p>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((person, index) => (
              <div
                key={index}
                className="relative overflow-hidden bg-gray-900 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                {/* Blurred colored shapes */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-30 rounded-lg filter blur-3xl"></div>

                <div className="flex overflow-hidden items-center space-x-4 relative z-10">
                  <img className="border rounded-full" src={person.image} />
                  {/* <div className='bg-gray-600 rounded-full h-14 w-14'></div> */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {person.name}
                    </h3>
                    <p className="text-sm text-gray-400">{person.role}</p>
                  </div>
                </div>

                <p className="mt-4 text-gray-300 relative z-10">
                  {person.testimonial}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>




    <div className="relative bg-gray-900 min-h-screen flex items-center justify-center overflow-hidden">
  {/* Diagonal lines pattern background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="diagonal-lines"></div>
  </div>

  <div className='text-center mt-20 py-16 mb-24 pb-20 relative z-10'>
    <h1 className="text-5xl font-bold text-white">Take the First Step Towards a Safer Tomorrow</h1>
    <p className="mt-4 text-lg text-gray-400">
      Join thousands who've already found peace of mind with SafeSpace AI
    </p>
    <button onClick={buttonHandle} className='bg-white text-black rounded-sm p-3 mt-16'>
      Create your safe space now!
    </button>
  </div>

  <style jsx>{`
    .diagonal-lines {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.1) 75%);
      background-size: 40px 40px; /* Adjust size as needed */
      opacity: 0.55; /* Adjust for visibility */
    }
  `}</style>
</div>

  <footer className="bg-black text-white py-14 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SafeSpace AI</h3>
            <p className="text-sm mb-4">
              Empowering communities through technology. Committed to ensuring
              safety and security for everyone.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-orange-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-400 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/smp-control-systems-private-limited/"
                className="text-white hover:text-orange-400 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-orange-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-orange-400 transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic">
              {/* {/* <p className="flex items-center mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                   
              </p>
              <p className="flex items-center mb-2">
                <Phone className="h-5 w-5 mr-2" />
                 
              </p> */}
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                SafeSpaceAI@gmail.com
              </p>
            </address>
          </div>
          
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; 2024 Nova. All rights reserved.</p>
        </div>
      </footer>


  </>
  );
}
