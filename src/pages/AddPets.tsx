import ImageUpload from '../components/ImageUpload'

function AddPets() {
    return (
        <div className='min-h-screen overflow-auto'>
            <div className='p-4 md:p-10 pt-16 md:pt-20 flex flex-col text-black justify-center items-center'>
                <div className='flex flex-col items-center gap-2'>
                    <h1 className='text-xl md:text-2xl font-bold'>Add Your Pets</h1>
                    <div className='text-lg md:text-2xl text-center'>Help your pet find the perfect new home</div>
                </div>

                <form action=""
                    className='flex flex-col lg:flex-row pt-5 gap-4 w-full max-w-6xl'
                >
                    {/*Left Side Section*/}
                    {/*Basic Information Section*/}
                    <span className='flex flex-col gap-3 md:gap-1 p-4 border-solid border-2 border-gray-300 rounded-lg shadow-gray-500 shadow-lg w-full lg:w-auto'>
                        <div className='text-xl md:text-2xl font-bold m-1'>Basic Information</div>

                        <div className='flex flex-col md:flex-row gap-4 md:gap-20'>

                            <div className='flex flex-col w-full md:w-auto'>
                                <label htmlFor="pet-name">Pet Name</label>
                                <input
                                    type="text"
                                    id="pet-name"
                                    name="pet-name"
                                    className='border-solid border-2 border-gray-300 rounded-md p-1 w-full' />
                            </div>

                            <div className='flex flex-col w-full md:w-auto'>
                                <label htmlFor="pet-type">Pet Type</label>
                                <input
                                    type="text"
                                    id="pet-type"
                                    name="pet-type"
                                    className='border-solid border-2 border-gray-300 rounded-md p-1 w-full' />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 md:gap-20'>
                            <div className='flex flex-col w-full md:w-auto'>
                                <label htmlFor="breed">Breed</label>
                                <input
                                    type="text"
                                    id="breed"
                                    name="breed"
                                    className='border-solid border-2 border-gray-300 rounded-md p-1 w-full' />
                            </div>

                            <div className='flex flex-col w-full md:w-auto'>
                                <label htmlFor="age">Age(Years)</label>
                                <input
                                    type="text"
                                    id="age"
                                    name="age"
                                    className='border-solid border-2 border-gray-300 rounded-md p-1 w-full' />
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                className='border-solid border-2 border-gray-300 rounded-md p-1 h-24 md:h-32 w-full'
                            ></textarea>
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 md:gap-20'>
                            <div className='flex flex-col w-full md:w-auto'>
                                <label htmlFor="Location">Location</label>
                                <input
                                    type="text"
                                    id="Location"
                                    name="Location"
                                    className='border-solid border-2 border-gray-300 rounded-md p-1 w-full' />
                            </div>

                            <div className='flex flex-col w-full md:w-auto'>
                                <label htmlFor="price">Price(Leave Blank For Free)</label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    className='border-solid border-2 border-gray-300 rounded-md p-1 w-full' />
                            </div>

                        </div>
                    </span>

                    {/*Right Side Section*/}
                    <div className='flex flex-col gap-4 w-full lg:w-auto'>

                        {/*Upload Images Section*/}
                        <span className='flex flex-col items-center gap-2 p-4 border-solid border-2 border-gray-300 rounded-lg shadow-gray-500 shadow-lg'>
                            <div className='text-xl md:text-2xl font-bold m-2'>Upload Images</div>

                            <div className='flex flex-col sm:flex-row gap-4 sm:gap-0'>
                                <div className='flex flex-col gap-1 justify-center items-center'>
                                    <div className='sm:mr-5'>
                                        <ImageUpload />

                                    </div>
                                    <label htmlFor='image-1'>Image 1</label>
                                </div>

                                <div className='flex flex-col gap-1 justify-center items-center'>
                                    <div className='sm:mr-5'>
                                        <ImageUpload />
                                    </div>
                                    <label htmlFor='image-2'>Image 2</label>
                                </div>

                                <div className='flex flex-col gap-1 justify-center items-center'>
                                    <div>
                                        <ImageUpload />
                                    </div>
                                    <label htmlFor='image-3'>Image 3</label>
                                </div>

                            </div>
                        </span>

                        {/*Health Information Section*/}
                        <span className='flex flex-col gap-2 h-full border-solid border-2 border-gray-300 p-4 md:p-5 rounded-lg shadow-gray-500 shadow-lg'>

                            <div className='flex flex-row justify-center'>
                                <div className='text-xl md:text-2xl font-bold m-2'>Health Information</div>
                            </div>

                            <div className='flex flex-col sm:flex-row justify-center gap-4 sm:gap-0'>

                                <div className='flex flex-row items-center-safe sm:mr-10'>
                                    <input type='checkbox' id='vaccinated' name='vaccinated' 
                                className=' hover:accent-black size-5 accent-purple-500'
                                />
                                    <label htmlFor='vaccinated' className='ml-2'>Vaccinated</label></div>

                                <div className='flex flex-row items-center-safe sm:ml-10'>
                                    <input type='checkbox' id='neutered' name='neutered' 
                                className=' hover:accent-black size-5 accent-purple-500'
                                />
                                    <label htmlFor='neutered' className='ml-2'>Neutered/Spayed</label></div>

                            </div>

                            <div className='flex flex-col'>
                                <div className='left-auto'>Additional Health Notes</div>
                                <textarea
                                    id="health-notes"
                                    className='border-solid border-2 border-gray-300 rounded-md p-1 w-full h-24 md:h-32'
                                ></textarea>
                            </div>
                        </span>

                        {/*Submit Button*/}
                        <div className='flex justify-center items-center'>
                            <button
                                type="submit"
                                className='bg-purple-500 text-white text-lg md:text-2xl font-bold px-5 py-2 rounded-md w-full shadow-lg shadow-purple-300 hover:bg-purple-800'
                            >
                                Add Pet
                            </button>
                        </div>
                    </div>



                </form>

            </div>
        </div>
    )
}

export default AddPets