// Globe.tsx
import React, { useState } from 'react';
import Earth from './Earth1';
import Earth2 from './Earth2';

type Props = {
  className?: string;
  isVisible: boolean; // Add this line
};

const Globe = ({ className, isVisible }: Props) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [hovered1, setHovered1] = useState<boolean>(false);

  return (
    <div className={`overflow-hidden relative ${className} ${isVisible ? '' : 'hidden'}`}>
      <div className={`relative z-[2] max-sm:hidden`}>
        <Earth />
      </div>
      <div className={`relative z-[2] sm:hidden`}>
        <Earth2 />
      </div>
      <div className='flex items-center justify-center relative z-[2] mt-[0px]'>
        {/* Additional elements if needed */}
      </div>
    </div>
  );
}

export default Globe;
