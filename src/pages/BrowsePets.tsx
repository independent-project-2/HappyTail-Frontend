import DogCard from "../components/DogCard";
import ViewPets from "../components/ViewPets";

const dummyDogCardProps = {
    imageUrl: "../../assets/images/germen-sheperd.jpg",
    dogType: "German Shepherd",
    address: "Uva wellassa, Badulla",
    description: "It is a long established fact that a reader will be distracted by the readable content",
    price: "$100"
};

export default function BrowsePets() {
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
                    {/* Dog Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10 px-4 md:px-20 mt-10">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <DogCard key={index} {...dummyDogCardProps} />
                        ))}
                    </div>

                </div>
                
            </div>


        </>


    );
}