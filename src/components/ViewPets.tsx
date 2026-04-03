import React, { useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, MapPin, Heart, Syringe, Scissors, Trophy, DollarSign } from 'lucide-react';

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
    <div ref={viewPetsRef} onClick={closeViewPets} className='fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4 opacity-100 transition-opacity duration-300'>

      <div className='relative w-full max-w-4xl bg-white rounded-3xl flex flex-col lg:flex-row gap-0 overflow-hidden text-black bg-gradient-to-br from-white via-white to-purple-50 shadow-2xl scale-100 transition-transform duration-300 max-h-[90vh] overflow-y-auto'>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className='absolute top-4 right-4 z-10 p-2 hover:bg-slate-100 rounded-full transition-all duration-200 hover:scale-110'
        >
          <X size={28} className="text-slate-600" />
        </button>

        {/* Image Section */}
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-6 lg:p-8'>
          <div className='relative w-full max-w-96 rounded-2xl overflow-hidden shadow-lg'>
            <img 
              src={currentImage}
              alt={petData?.name || 'Pet'}
              className='w-full h-96 object-cover'
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = '../../assets/images/germen-sheperd.jpg';
              }}
            />
            {/* Image Badge */}
            <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-slate-700 shadow-lg'>
              {currentImageIndex + 1} / {totalImages}
            </div>
          </div>

          {/* Image Navigation */}
          {totalImages > 1 && (
            <div className='flex flex-row gap-4 mt-6 items-center'>
              <button
                onClick={handlePrevImage}
                className='p-3 hover:bg-purple-100 rounded-full transition-all duration-200 hover:scale-110 hover:text-purple-600'
              >
                <ChevronLeft size={24} />
              </button>
              <div className='flex gap-2'>
                {imageArray.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-purple-500 w-8'
                        : 'bg-slate-300 w-2 hover:bg-slate-400 cursor-pointer'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
              <button
                onClick={handleNextImage}
                className='p-3 hover:bg-purple-100 rounded-full transition-all duration-200 hover:scale-110 hover:text-purple-600'
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className='w-full lg:w-1/2 p-6 lg:p-8 flex flex-col gap-5'>
          {/* Header */}
          <div className='space-y-2'>
            <div className='flex items-center gap-3'>
              <h1 className='text-4xl font-bold text-slate-900'>{petData?.name || 'Pet Name'}</h1>
              <Heart className='text-red-500 fill-red-500' size={24} />
            </div>
            <div className='flex items-center gap-2 text-slate-600'>
              <span className='text-lg font-semibold'>{petData?.breed || 'Breed'}</span>
              <span className='text-slate-300'>•</span>
              <span className='text-lg font-semibold'>{petData?.type || 'Type'}</span>
            </div>
          </div>

          {/* Location Badge */}
          <div className='flex items-center gap-2 px-4 py-3 bg-orange-50 rounded-lg border-2 border-orange-100'>
            <MapPin size={20} className='text-orange-500' />
            <span className='font-semibold text-slate-700'>{petData?.location || 'Location not specified'}</span>
          </div>

          {/* Description */}
          {petData?.description && (
            <div className='p-4 bg-slate-50 rounded-lg border-l-4 border-purple-500'>
              <p className='text-slate-700 leading-relaxed'>{petData.description}</p>
            </div>
          )}

          {/* Health & Info Cards */}
          <div className='grid grid-cols-2 gap-3'>
            {/* Age Card */}
            <div className='p-3 bg-blue-50 rounded-lg border-2 border-blue-100'>
              <div className='text-xs font-bold text-blue-600 uppercase tracking-wider'>Age</div>
              <div className='text-xl font-bold text-slate-900 mt-1'>{petData?.age || '?'} years</div>
            </div>

            {/* Vaccinated Card */}
            <div className={`p-3 rounded-lg border-2 flex items-center gap-2 ${
              petData?.vaccinated 
                ? 'bg-green-50 border-green-100' 
                : 'bg-slate-50 border-slate-100'
            }`}>
              <Syringe size={20} className={petData?.vaccinated ? 'text-green-600' : 'text-slate-400'} />
              <div>
                <div className='text-xs font-bold uppercase tracking-wider text-slate-600'>Vaccinated</div>
                <div className='text-lg font-bold text-slate-900'>{petData?.vaccinated ? 'Yes ✓' : 'No'}</div>
              </div>
            </div>

            {/* Neutered Card */}
            <div className={`p-3 rounded-lg border-2 flex items-center gap-2 ${
              petData?.neutered 
                ? 'bg-pink-50 border-pink-100' 
                : 'bg-slate-50 border-slate-100'
            }`}>
              <Scissors size={20} className={petData?.neutered ? 'text-pink-600' : 'text-slate-400'} />
              <div>
                <div className='text-xs font-bold uppercase tracking-wider text-slate-600'>Neutered</div>
                <div className='text-lg font-bold text-slate-900'>{petData?.neutered ? 'Yes ✓' : 'No'}</div>
              </div>
            </div>

            {/* Price Card */}
            <div className='p-3 bg-purple-50 rounded-lg border-2 border-purple-100'>
              <div className='text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1'>
                <DollarSign size={16} /> Price
              </div>
              <div className='text-2xl font-bold text-purple-600 mt-1'>${petData?.price || '0'}</div>
            </div>
          </div>

          {/* Health Notes */}
          {petData?.health_notes && (
            <div className='p-4 bg-amber-50 rounded-lg border-2 border-amber-100'>
              <div className='flex items-center gap-2 mb-2'>
                <Trophy size={18} className='text-amber-600' />
                <h3 className='font-bold text-slate-900'>Health Notes</h3>
              </div>
              <p className='text-slate-700 text-sm'>{petData.health_notes}</p>
            </div>
          )}

          {/* CTA Button */}
          <button className='w-full mt-4 py-4 px-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2'>
            <Heart size={20} />
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  )
}
