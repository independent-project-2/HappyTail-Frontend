import React, { useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ViewPets({ onClose }: { onClose: () => void }) {

  const viewPetsRef = useRef(null);

  const closeViewPets = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewPetsRef.current === e.target) {
      onClose();
    }
  }

  return (
    <div ref={viewPetsRef} onClick={closeViewPets} className='fixed inset-0 bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center'>

      <div className='relative w-3/4 border-2 border-solid border-gray-300 rounded-xl flex flex-row gap-10 p-10 justify-center text-black bg-white'>
        <X onClick={onClose} size={30} className="cursor-pointer absolute right-0 top-0 m-4" />

        <div className='flex flex-col items-center'>
          <img src='../../assets/images/germen-sheperd.jpg'
            className='rounded-xl'
          ></img>

          <div className='flex flex-row gap-3 mt-4 cursor-pointer'>
            <ChevronLeft size={30} />
            <div className='text-gray-400 text-xl'>1/8</div>
            <ChevronRight size={30} />
          </div>

        </div>

        <div className='relative flex flex-col gap-2 text-black'>
          <div className='font-bold text-4xl'>Dog name</div>
          <div className=''>Dog Address</div>
          <div className='text-gray-400 max-w-md'>It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using
            Lorem Ipsum is that it has a more-
            or-less normal distribution of letters,
            as opposed to using 'Content here, content here',
            making it look like readable</div>
          <div className='flex flex-row gap-2'>
            <div className='font-bold'>Age:</div>
            <div className='text-gray-400'>1 year</div>
          </div>
          <div className='font-bold uppercase'>FREE</div>
          <button className='bg-purple-500 text-white text-3xl rounded-xl p-4 mt-4 w-fit hover:bg-purple-600 absolute right-0 bottom-0'>Get</button>
        </div>
      </div>
    </div>
  )
}
