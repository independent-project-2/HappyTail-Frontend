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
    const image = props.petData?.images?.[0] || props.imageUrl;
    const type = props.petData?.type || props.dogType;
    const address = props.petData?.location || props.address;
    const description = props.petData?.description || props.description;
    const price = props.petData ? `$${props.petData.price}` : props.price;

    return (
        <>
            <div className="relative shadow-xl rounded-xl text-black flex flex-col overflow-hidden 
                           transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <img
                    src={image}
                    alt={type || "Pet Image"}
                    className="w-full object-cover"
                />

                <div className="p-4 flex flex-col gap-2">
                    <div className="font-bold text-xl">{type}</div>
                    <div>{address}</div>
                    <div className="text-gray-500 font-medium">{description}</div>
                    <div className="text-lg font-semibold">{price}</div>

                    
                    
                    <button 
                    onClick={handleViewPets}
                    className="rounded-xl absolute right-0 bottom-0 text-purple-700 border-2 border-purple-700 border-solid rounded-xl p-2 m-2 hover:bg-purple-700 hover:text-white transition-colors">
                        View More
                    </button>
                </div>
            </div>
            {viewPets && <ViewPets petData={props.petData} onClose={() => setViewPets(false)} />}
        </>
    )
}