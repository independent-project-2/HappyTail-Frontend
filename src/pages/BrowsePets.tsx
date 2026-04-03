import DogCard from "../components/DogCard";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";
import { getCookie } from "../utils/cookies";


export default function BrowsePets() {
    const [pets, setPets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        location: "",
        type: "",
        price: ""
    });

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            setLoading(true);
            const token = getCookie('authToken');
            
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(API_ENDPOINTS.pets.getAll, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch pets: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Fetched pets:', data);
            
            // Handle both array response and object with data property
            const petList = Array.isArray(data) ? data : data.data || [];
            setPets(petList);
            setError(null);
        } catch (err) {
            console.error('Error fetching pets:', err);
            setError(err instanceof Error ? err.message : 'Failed to load pets');
            setPets([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const token = getCookie('authToken');
            
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            // Build filter query parameters
            const queryParams = new URLSearchParams();
            if (filters.location) queryParams.append('location', filters.location);
            if (filters.type) queryParams.append('type', filters.type);
            if (filters.price) queryParams.append('price', filters.price);

            const filterUrl = queryParams.toString() 
                ? `${API_ENDPOINTS.pets.filter}?${queryParams.toString()}`
                : API_ENDPOINTS.pets.getAll;

            const response = await fetch(filterUrl, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch filtered pets: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Filtered pets:', data);
            
            // Handle both array response and object with data property
            const petList = Array.isArray(data) ? data : data.data || [];
            setPets(petList);
            setError(null);
        } catch (err) {
            console.error('Error filtering pets:', err);
            setError(err instanceof Error ? err.message : 'Failed to filter pets');
            setPets([]);
        } finally {
            setLoading(false);
        }
    };

    const handleClearFilters = () => {
        setFilters({
            location: "",
            type: "",
            price: ""
        });
        fetchPets(); // Fetch all pets without filters
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <div className="min-h-screen bg-white overflow-auto">
                <form onSubmit={handleSearch} 
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4 md:gap-10 justify-center mt-16 md:mt-20">
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
                                name="location"
                                value={filters.location}
                                onChange={handleFilterChange}
                                className="w-full rounded-xl border-2 border-gray-300 bg-white/90 py-3 pl-10 pr-4 text-lg text-black focus:border-purple-500 outline-none appearance-none cursor-pointer"
                            >
                                <option value="">All Locations</option>
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
                                name="type"
                                value={filters.type}
                                onChange={handleFilterChange}
                                className="w-full rounded-xl border-2 border-gray-300 bg-white/90 py-3 pl-10 pr-4 text-lg text-black focus:border-purple-500 outline-none appearance-none cursor-pointer"
                            >
                                <option value="">All Types</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Bird">Bird</option>
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
                                name="price"
                                value={filters.price}
                                onChange={handleFilterChange}
                                className="w-full rounded-xl border-2 border-gray-300 bg-white/90 py-3 pl-10 pr-4 text-lg text-black focus:border-purple-500 outline-none appearance-none cursor-pointer"
                            >
                                <option value="">All Prices</option>
                                <option value="free">Free</option>
                                <option value="paid">Paid</option>

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


                    <div className='flex gap-3 w-full md:w-auto'>
                        <button 
                            className="flex-1 md:flex-none rounded-xl bg-purple-500 text-white py-3 px-6 font-bold text-lg hover:bg-purple-600 transition-colors" 
                            type="submit"
                        >
                            🔍 Search
                        </button>
                        <button 
                            className="flex-1 md:flex-none rounded-xl bg-slate-300 text-slate-700 py-3 px-6 font-bold text-lg hover:bg-slate-400 transition-colors" 
                            type="button"
                            onClick={handleClearFilters}
                        >
                            Clear
                        </button>
                    </div>
                </form>

                <div>
                    {/* Filter Results Indicator */}
                    {!loading && (
                        <div className='px-4 md:px-20 mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between'>
                            <div className='text-slate-700 font-semibold'>
                                <span className='text-2xl font-bold text-purple-600'>{pets.length}</span>
                                <span className='ml-2'>pets found</span>
                                {(filters.location || filters.type || filters.price) && (
                                    <span className='ml-4 text-sm text-slate-500'>
                                        (Filtered by: {[
                                            filters.location && `Location: ${filters.location}`,
                                            filters.type && `Type: ${filters.type}`,
                                            filters.price && `Price: ${filters.price}`
                                        ].filter(Boolean).join(', ')})
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center mt-10 min-h-96">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                                <p className="text-gray-600 text-lg">Loading pets...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="flex justify-center items-center mt-10 min-h-96">
                            <div className="text-center">
                                <p className="text-red-500 text-lg mb-4">⚠️ {error}</p>
                                <button
                                    onClick={fetchPets}
                                    className="bg-purple-500 text-white py-2 px-6 rounded-xl font-bold"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    )}

                    {/* No Pets State */}
                    {!loading && !error && pets.length === 0 && (
                        <div className="flex justify-center items-center mt-10 min-h-96">
                            <div className="text-center">
                                <p className="text-gray-600 text-xl font-semibold mb-4">😿 No pets found</p>
                                <p className="text-gray-500 mb-6">
                                    {(filters.location || filters.type || filters.price) 
                                        ? 'Try adjusting your filters' 
                                        : 'Check back soon for new additions'}
                                </p>
                                {(filters.location || filters.type || filters.price) && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="bg-purple-500 text-white py-2 px-6 rounded-xl font-bold hover:bg-purple-600 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Dog Cards Grid */}
                    {!loading && pets.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10 px-4 md:px-20 mt-10 auto-rows-fr">
                            {pets.map((pet) => (
                                <DogCard
                                    key={pet.id}
                                    petData={pet}
                                />
                            ))}
                        </div>
                    )}

                </div>
                
            </div>


        </>


    );
}