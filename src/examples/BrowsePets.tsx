import DogCard from "../components/DogCard";
import { useEffect, useState } from "react";
import { API_ENDPOINTS, getHeaders } from '../config/api';


interface Pet {
    id: number;
    name: string;
    type: string;
    location: string;
    description: string;
    price: number;
    imageUrls: string[];
}



// const dummyDogCardProps = {
//     imageUrl: "../../assets/images/germen-sheperd.jpg",
//     dogType: "German Shepherd",
//     address: "Uva wellassa, Badulla",
//     description: "It is a long established fact that a reader will be distracted by the readable content",
//     price: "$100"
// };

export default function BrowsePets() {

    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPets() {
            try {
                setError(null);
                
                // Test direct Azure endpoint first
                const directUrl = 'https://happytail-backend-btdnewfhhvajeybe.southeastasia-01.azurewebsites.net/api/Pet/all';
                console.log('🔍 Testing direct Azure endpoint:', directUrl);
                
                try {
                    const directResponse = await fetch(directUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    console.log('Direct Azure response status:', directResponse.status);
                    if (directResponse.ok) {
                        const data = await directResponse.json();
                        console.log('✅ Direct Azure endpoint works! Data:', data);
                        setPets(Array.isArray(data) ? data : (data.data || data.pets || []));
                        setLoading(false);
                        return;
                    }
                } catch (directError) {
                    console.log('❌ Direct Azure endpoint failed:', directError);
                }
                
                // Fall back to proxy endpoint
                console.log('🔍 Trying proxy endpoint:', API_ENDPOINTS.pets.browse);
                let response = await fetch(API_ENDPOINTS.pets.browse, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                console.log('Response status (no auth):', response.status);
                
                // If 401 or 403, try with authentication
                if (response.status === 401 || response.status === 403) {
                    console.log('Trying with authentication...');
                    response = await fetch(API_ENDPOINTS.pets.browse, {
                        method: 'GET',
                        headers: getHeaders(true),
                    });
                    console.log('Response status (with auth):', response.status);
                }
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error response:', errorText);
                    setError(`Server error (${response.status}): The backend at Azure is not responding correctly. Please check:\n1. Is the backend deployed and running?\n2. Check backend logs at Azure Portal\n3. Test the endpoint directly: ${directUrl}`);
                    return;
                }

                const responseText = await response.text();
                console.log('Raw response:', responseText);
                
                if (!responseText) {
                    console.error('Empty response from server');
                    setError('Empty response from server');
                    return;
                }
                
                let data;
                try {
                    data = JSON.parse(responseText);
                } catch (parseError) {
                    console.error('JSON parse error:', parseError);
                    setError('Invalid JSON response from server');
                    return;
                }
                
                console.log('Parsed data:', data);
                
                // Handle different response formats
                if (Array.isArray(data)) {
                    console.log('✅ Setting pets array, length:', data.length);
                    setPets(data);
                } else if (data && typeof data === 'object') {
                    if (data.data && Array.isArray(data.data)) {
                        console.log('✅ Setting pets from data.data, length:', data.data.length);
                        setPets(data.data);
                    } else if (data.pets && Array.isArray(data.pets)) {
                        console.log('✅ Setting pets from data.pets, length:', data.pets.length);
                        setPets(data.pets);
                    } else {
                        console.warn('⚠️ Unexpected data structure:', Object.keys(data));
                        setError('Unexpected response format from server');
                    }
                }
            } catch (error) {
                console.error('❌ Error fetching pets:', error);
                setError('Network error: Unable to connect to the server.');
            } finally {
                setLoading(false);
            }
        }

        fetchPets();
    }, []);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        window.location.reload();
    };



    return (
        <>
            <div className="min-h-screen bg-white overflow-auto">
                <form onSubmit={() => { }}
                    className="flex flex-col md:flex-row p-4 md:p-10 gap-4 md:gap-10 justify-center mt-16 md:mt-20">
                    {/* Location Container */}
                    <div className="relative w-full md:w-72">

                        {/* The Label: Positioned on the border */}
                        <label
                            className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-500 z-10"
                        >
                            Location
                        </label>

                        {/* The Select Box */}
                        <div className="relative flex items-center">
                            <select
                                className="w-full rounded-xl border-2 border-gray-300 bg-transparent py-4 pl-4 pr-10 text-2xl font-normal text-black outline-none transition-colors focus:border-blue-500 appearance-none cursor-pointer"
                            >
                                <option value="Srilanka">Srilanka</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                            </select>

                            {/* Custom Arrow Icon */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg
                                    className="h-6 w-6 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Type Container */}
                    <div className="relative w-full md:w-72">

                        {/* The Label: Positioned on the border */}
                        <label
                            className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-500 z-10"
                        >
                            Type
                        </label>

                        {/* The Select Box */}
                        <div className="relative flex items-center">
                            <select
                                className="w-full rounded-xl border-2 border-gray-300 bg-transparent py-4 pl-4 pr-10 text-2xl font-normal text-black outline-none transition-colors focus:border-blue-500 appearance-none cursor-pointer"
                            >
                                <option value="BullDog">Bull Dog</option>
                                <option value="Beagle">Beagle</option>
                                <option value="Poodle">Poodle</option>
                            </select>

                            {/* Custom Arrow Icon */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg
                                    className="h-6 w-6 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Price Container */}
                    <div className="relative w-full md:w-72">

                        {/* The Label: Positioned on the border */}
                        <label
                            className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-500 z-10"
                        >
                            Price
                        </label>

                        {/* The Select Box */}
                        <div className="relative flex items-center">
                            <select
                                className="w-full rounded-xl border-2 border-gray-300 bg-transparent py-4 pl-4 pr-10 text-2xl font-normal text-black outline-none transition-colors focus:border-blue-500 appearance-none cursor-pointer"
                            >
                                <option value="Srilanka">Free</option>
                                <option value="India">Paid</option>

                            </select>

                            {/* Custom Arrow Icon */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg
                                    className="h-6 w-6 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    <button className="block w-full md:w-50 bg-purple-500 border border-gray-700 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-border font-bold text-xl md:text-2xl" type="submit">Search</button>
                </form>

                <div>
                    {/* Error Message */}
                    {error && (
                        <div className="mx-4 md:mx-20 mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            <div className="flex items-start">
                                <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <div className="flex-1">
                                    <p className="font-semibold">Error Loading Pets</p>
                                    <p className="text-sm mt-1">{error}</p>
                                    <button 
                                        onClick={handleRetry}
                                        className="mt-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                                    >
                                        Retry
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Dog Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10 px-4 md:px-20 mt-10">
                        {loading && <p className="text-center col-span-full text-lg text-gray-600">Loading pets...</p>}

                        {!loading && !error && pets.length === 0 && (
                            <p className="text-center col-span-full text-lg text-gray-600">No pets available at the moment.</p>
                        )}

                        {pets.map((pet) => (
                            <DogCard
                                key={pet.id}
                                imageUrl={pet.imageUrls?.[0] ?? "/placeholder.jpg"}
                                dogType={pet.name}
                                address={pet.location}
                                description={pet.description}
                                price={pet.price === 0 ? "Free" : `$${pet.price}`}
                            />
                        ))}

                    </div>

                </div>

            </div>


        </>


    );
}