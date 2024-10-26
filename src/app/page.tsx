'use client'
import Image from "next/image";
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter();
  // const handleNavigation = () => {
  //   router.push('/new-page'); // Navigate to a new page
  // };
  return (
    <>  
      {router.push('/home')}
    </>
  );
}
