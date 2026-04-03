import { useState } from "react";
import ViewPets from "./ViewPets";

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

interface DogCardProps {
  imageUrl?: string;
  dogType?: string;
  address?: string;
  description?: string;
  price?: string;
  petData?: PetData;
}



export default function DogCard(
    props: DogCardProps
) {

    const [viewPets , setViewPets] = useState(false);

    function handleViewPets() {
        setViewPets(true);
    }

    // Use petData if provided, otherwise fall back to individual props
    let image = props.imageUrl || props.address;
    
    if (props.petData) {
      // Try to extract image from petData
      if (props.petData.images && Array.isArray(props.petData.images) && props.petData.images.length > 0) {
        image = props.petData.images[0];
      } else if (props.petData.imageUrl) {
        // Check if imageUrl is a JSON array
        try {
          const parsed = JSON.parse(props.petData.imageUrl);
          if (Array.isArray(parsed) && parsed.length > 0) {
            image = parsed[0];
          } else {
            image = props.petData.imageUrl;
          }
        } catch (e) {
          // Not JSON, use as is
          image = props.petData.imageUrl;
        }
      }
    }
    
    const type = props.petData?.type || props.dogType;
    const address = props.petData?.location || props.address;
    const description = props.petData?.description || props.description;
    const price = props.petData ? `$${props.petData.price}` : props.price;

    return (
        <>
            <div className="relative shadow-xl rounded-xl text-black flex flex-col overflow-hidden 
                           transition-transform duration-300 hover:scale-105 hover:shadow-2xl h-full">
                <img
                    src={image}
                    alt={type || "Pet Image"}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '../../assets/images/germen-sheperd.jpg';
                    }}
                />

                <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
                    <div className="flex-1">
                        <div className="font-bold text-lg">{type}</div>
                        <div className="text-sm text-gray-600 mb-1">{address}</div>
                        <div className="text-gray-500 font-medium text-sm line-clamp-2 leading-relaxed">{description}</div>
                    </div>
                    <div className="text-lg font-semibold mt-auto">{price}</div>

                    
                    
                    <button 
                    onClick={handleViewPets}
                    className="rounded-xl w-full text-purple-700 border-2 border-purple-700 border-solid p-2 hover:bg-purple-700 hover:text-white transition-colors font-bold">
                        View More
                    </button>
                </div>
            </div>
            {viewPets && <ViewPets petData={props.petData} onClose={() => setViewPets(false)} />}
        </>
    )
}