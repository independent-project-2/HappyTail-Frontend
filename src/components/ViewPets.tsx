import React, { useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PetData {
  id?: number;
  name?: string;
  type?: string;
  breed?: string;
  age?: number;
  location?: string;
  description?: string;
  price?: number;
  vaccinated?: boolean;
  neutered?: boolean;
  health_notes?: string;
  images?: string[];
  imageUrl?: string;
}

export default function ViewPets({ onClose, petData }: { onClose: () => void; petData?: PetData }) {

  const viewPetsRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const closeViewPets = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewPetsRef.current === e.target) {
      onClose();
    }
  }

  const handlePrevImage = () => {
    const imageArray = getImageArray();
    if (imageArray.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    const imageArray = getImageArray();
    if (imageArray.length > 0) {
      setCurrentImageIndex((prev) => (prev === imageArray.length - 1 ? 0 : prev + 1));
    }
  };

  const getImageArray = (): string[] => {
    // First check if images is an array
    if (petData?.images && Array.isArray(petData.images) && petData.images.length > 0) {
      return petData.images;
    }
    
    // Then check if imageUrl contains JSON array
    if (petData?.imageUrl) {
      try {
        const parsed = JSON.parse(petData.imageUrl);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // Not JSON, treat as single URL
      }
      // If it's a single URL string, return it as array
      return [petData.imageUrl];
    }
    
    return [];
  };

  const imageArray = getImageArray();
  const currentImage = imageArray.length > 0 
    ? imageArray[currentImageIndex] 
    : '../../assets/images/germen-sheperd.jpg';

  const totalImages = imageArray.length || 1;

  return (
    <div ref={viewPetsRef} onClick={closeViewPets} className='fixed inset-0 bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center'>

      <div className='relative w-3/4 border-2 border-solid border-gray-300 rounded-xl flex flex-row gap-10 p-10 justify-center text-black bg-white'>
        <X onClick={onClose} size={30} className="cursor-pointer absolute right-0 top-0 m-4" />

        <div className='flex flex-col items-center'>
          <img src={currentImage}
            alt={petData?.name || 'Pet'}
            className='rounded-xl w-96 h-96 object-cover'
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '../../assets/images/germen-sheperd.jpg';
            }}
          ></img>

          <div className='flex flex-row gap-3 mt-4 cursor-pointer'>
            <ChevronLeft size={30} onClick={handlePrevImage} className='hover:text-purple-500' />
            <div className='text-gray-400 text-xl'>{currentImageIndex + 1}/{totalImages}</div>
            <ChevronRight size={30} onClick={handleNextImage} className='hover:text-purple-500' />
          </div>

        </div>

        <div className='relative flex flex-col gap-2 text-black'>
          <div className='font-bold text-4xl'>{petData?.name || 'Pet Name'}</div>
          <div className='text-lg text-gray-600'>{petData?.breed || 'Breed'} • {petData?.type || 'Type'}</div>
          <div className=''>{petData?.location || 'Location not specified'}</div>
          <div className='text-gray-400 max-w-md'>{petData?.description || 'No description available'}</div>
          
          <div className='flex flex-col gap-1 mt-4 pt-4 border-t border-gray-200'>
            <div className='flex flex-row gap-2'>
              <div className='font-bold'>Age:</div>
              <div className='text-gray-400'>{petData?.age || 'Unknown'} year(s)</div>
            </div>
            
            <div className='flex flex-row gap-2'>
              <div className='font-bold'>Vaccinated:</div>
              <div className='text-gray-400'>{petData?.vaccinated ? '✓ Yes' : 'No'}</div>
            </div>

            <div className='flex flex-row gap-2'>
              <div className='font-bold'>Neutered:</div>
              <div className='text-gray-400'>{petData?.neutered ? '✓ Yes' : 'No'}</div>
            </div>

            {petData?.health_notes && (
              <div className='flex flex-row gap-2'>
                <div className='font-bold'>Health Notes:</div>
                <div className='text-gray-400 text-sm'>{petData.health_notes}</div>
              </div>
            )}
          </div>

          <div className='font-bold text-xl uppercase mt-2'>${petData?.price || '0'}</div>
          <button className="bg-purple-500 text-white text-xl rounded-lg px-6 py-2 mt-4 hover:bg-purple-600 absolute right-4 bottom-4">
             Get in Touch
          </button>
        </div>
      </div>
    </div>
  )
}
