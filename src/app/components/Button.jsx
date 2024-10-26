import React from 'react'
import './button.css'
import { useRouter } from 'next/navigation';

const button = () => {
    const router = useRouter();
    function buttonHandle(){
        router.push('/login');
      }
  return (
    <div>
      <button onClick={buttonHandle} className="button"></button>
    </div>
  )
}

export default button
