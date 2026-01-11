import React from 'react'
import ImageUpload from '../components/ImageUpload'

function AddPets() {
    return (
        <div className='h-screen mt-18 p-10 flex flex-col gap-10 text-black justify-center items-center'>
            <div className='flex flex-col items-center gap-2'>
                <h1 className='text-2xl font-bold'>Add Your Pets</h1>
                <div className='text-2xl'>Help your pet find the perfect new home</div>
            </div>

            <form action=""
                className='flex flex-row'
            >
                {/*Left Side Section*/}
                {/*Basic Information Section*/}
                <span className='flex flex-col gap-3 m-5 border-solid border-2 border-gray-300 p-5 rounded-lg shadow-gray-500 shadow-lg'>
                    <div className='text-2xl font-bold m-2'>Basic Information</div>

                    <div className='flex flex-row gap-20'>

                        <div className='flex flex-col'>
                            <label htmlFor="pet-name">Pet Name</label>
                            <input
                                type="text"
                                id="pet-name"
                                name="pet-name"
                                className='border-solid border-2 border-gray-300 rounded-md p-1' />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="pet-type">Pet Type</label>
                            <input
                                type="text"
                                id="pet-type"
                                name="pet-type"
                                className='border-solid border-2 border-gray-300 rounded-md p-1' />
                        </div>
                    </div>

                    <div className='flex flex-row gap-20'>
                        <div className='flex flex-col'>
                            <label htmlFor="breed">Breed</label>
                            <input
                                type="text"
                                id="breed"
                                name="breed"
                                className='border-solid border-2 border-gray-300 rounded-md p-1' />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="age">Age(Years)</label>
                            <input
                                type="text"
                                id="age"
                                name="age"
                                className='border-solid border-2 border-gray-300 rounded-md p-1' />
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            className='border-solid border-2 border-gray-300 rounded-md p-1 h-75'
                        ></textarea>
                    </div>

                    <div className='flex flex-row gap-20'>
                        <div className='flex flex-col'>
                            <label htmlFor="Location">Location</label>
                            <input
                                type="text"
                                id="Location"
                                name="Location"
                                className='border-solid border-2 border-gray-300 rounded-md p-1' />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="price">Price(Leave Blank For Free)</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                className='border-solid border-2 border-gray-300 rounded-md p-1' />
                        </div>

                    </div>
                </span>

                {/*Right Side Section*/}
                <div className='flex flex-col gap-4 m-5'>

                    {/*Upload Images Section*/}
                    <span className='flex flex-col items-center gap-2 border-solid border-2 border-gray-300 p-5 rounded-lg shadow-gray-500 shadow-lg'>
                        <div className='text-2xl font-bold m-2'>Upload Images</div>

                        <div className='flex flex-row'>
                            <div className='flex flex-col gap-1 justify-center items-center'>
                                <div className='mr-5'>
                                   <ImageUpload/>
                                   
                                </div>
                                <label htmlFor='image-1'>Image 1</label>
                            </div>

                            <div className='flex flex-col gap-1 justify-center items-center'>
                                <div className='mr-5'>
                                    <ImageUpload/>
                                </div>
                                <label htmlFor='image-2'>Image 2</label>
                            </div>

                            <div className='flex flex-col gap-1 justify-center items-center'>
                                <div>
                                    <ImageUpload/>
                                </div>
                                <label htmlFor='image-3'>Image 3</label>
                            </div>

                        </div>
                    </span>

                    {/*Health Information Section*/}
                    <span className='flex flex-col gap-2 h-full border-solid border-2 border-gray-300 p-5 rounded-lg shadow-gray-500 shadow-lg'>

                        <div className='flex flex-row justify-center'>
                            <div className='text-2xl font-bold m-2'>Health Information</div>
                        </div>

                        <div className='flex flex-row gap-25'>

                            <div><input type='checkbox' id='vaccinated' name='vaccinated' />
                                <label htmlFor='vaccinated' className='ml-2'>Vaccinated</label></div>

                            <div><input type='checkbox' id='neutered' name='neutered' />
                                <label htmlFor='neutered' className='ml-2'>Neutered/Spayed</label></div>

                        </div>

                        <div>
                            <div className='left-auto'>Additional Health Notes</div>
                            <textarea
                                id="health-notes"
                                className='border-solid border-2 border-gray-300 rounded-md p-1 w-full h-full'
                            ></textarea>
                        </div>
                    </span>

                    {/*Submit Button*/}
                    <div className='flex justify-center items-center mt-5'>
                        <button
                            type="submit"
                            className='bg-purple-500 text-white text-2xl font-bold px-5 py-2 rounded-md w-full shadow-lg shadow-purple-300 hover:bg-purple-800'
                        >
                            Add Pet
                        </button>
                    </div>
                </div>



            </form>

        </div>
    )
}

export default AddPets