import ImageUpload from '../components/ImageUpload';
import { useState } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { getCookie } from '../utils/cookies';

function AddPets() {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        breed: '',
        age: '',
        location: '',
        price: '',
        description: '',
        vaccinated: false,
        neutered: false,
        health_notes: '',
    });

    const [images, setImages] = useState<(File | null)[]>([null, null, null]);


    const handleImageSelect = (index: number, file: File) => {
        setImages(prev => {
            const updated = [...prev];
            updated[index] = file;
            return updated;
        });
    };




    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if user is logged in
        const token = getCookie('authToken');
        if (!token) {
            alert('Please log in to add pets');
            return;
        }

        const formDataObj = new FormData();

        formDataObj.append("Name", formData.name);
        formDataObj.append("Type", formData.type);
        formDataObj.append("Breed", formData.breed);
        formDataObj.append("Age", formData.age || "0");
        formDataObj.append("Location", formData.location);
        formDataObj.append("Price", formData.price || "0");
        formDataObj.append("Description", formData.description);
        formDataObj.append("Vaccinated", String(formData.vaccinated));
        formDataObj.append("Neutered", String(formData.neutered));
        formDataObj.append("Health_notes", formData.health_notes);

        // add images
        images.forEach((file) => {
            if (file) {
                formDataObj.append("Images", file);
            }
        });

        // Debug logging
        console.log('FormData contents:');
        for (let [key, value] of formDataObj.entries()) {
            console.log(`  ${key}:`, value instanceof File ? `File: ${value.name}` : value);
        }
        console.log('Auth token present:', !!token);
        console.log('API Endpoint:', API_ENDPOINTS.pets.create);

        try {
            const response = await fetch(API_ENDPOINTS.pets.create, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataObj,
            });

            if (!response.ok) {
                // Get response text first (can only read body once)
                const responseText = await response.text();
                console.error('Response status:', response.status, response.statusText);
                console.error('Response body:', responseText);
                
                let errorMessage = 'Failed to add pet';
                
                // Try to parse as JSON
                try {
                    const errorData = JSON.parse(responseText);
                    console.error('Parsed error response:', errorData);

                    // Handle validation errors
                    if (errorData.errors) {
                        console.error('Validation errors:', errorData.errors);
                        const validationMessages = Object.entries(errorData.errors)
                            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                            .join('\n');
                        errorMessage = `Validation failed:\n${validationMessages}`;
                    } else {
                        errorMessage = errorData.title || errorData.message || errorData.detail || 'Server error occurred';
                    }
                } catch (parseError) {
                    // Response is not JSON
                    console.error('Response is not JSON');
                    errorMessage = `Server error (${response.status}): ${response.statusText}`;
                    
                    // If response text is not too long, include it in the message
                    if (responseText.length < 200) {
                        errorMessage += `\n${responseText}`;
                    }
                }
                
                alert(errorMessage);
                return;
            }

            alert('Pet added successfully 🐾');

            // Reset form after successful submission
            setFormData({
                name: '',
                type: '',
                breed: '',
                age: '',
                location: '',
                price: '',
                description: '',
                vaccinated: false,
                neutered: false,
                health_notes: '',
            });
        } catch (err) {
            console.error('Network error:', err);
            alert('Something went wrong. Please check your connection and try again.');
        }
    };




    return (
        <div className='min-h-screen overflow-auto'>
            <div className='p-4 md:p-10 pt-16 md:pt-20 flex flex-col text-black justify-center items-center'>
                <div className='flex flex-col items-center gap-2'>
                    <h1 className='text-xl md:text-2xl font-bold'>Add Your Pets</h1>
                    <div className='text-lg md:text-2xl text-center'>Help your pet find the perfect new home</div>
                </div>

                <form action=""
                    onSubmit={handleSubmit}
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
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className='border-solid border-2 border-gray-300 rounded-md p-1 w-full' />
                            </div>

                            <div className='flex flex-col w-full md:w-auto'>
                                <label htmlFor="pet-type">Pet Type</label>
                                <input
                                    type="text"
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
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
                                    value={formData.breed}
                                    onChange={handleChange}
                                    className='border-solid border-2 border-gray-300 rounded-md p-1 w-full' />
                            </div>

                            <div className='flex flex-col w-full md:w-auto'>
                                <label htmlFor="age">Age(Years)</label>
                                <input
                                    type="text"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className='border-solid border-2 border-gray-300 rounded-md p-1 w-full' />
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className='border-solid border-2 border-gray-300 rounded-md p-1 h-24 md:h-32 w-full'
                            ></textarea>
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 md:gap-20'>
                            <div className='flex flex-col w-full md:w-auto'>
                                <label htmlFor="Location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className='border-solid border-2 border-gray-300 rounded-md p-1 w-full' />
                            </div>

                            <div className='flex flex-col w-full md:w-auto'>
                                <label htmlFor="price">Price(Leave Blank For Free)</label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
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
                                        <ImageUpload onFileSelect={(file) => handleImageSelect(0, file)} />

                                    </div>
                                    <label htmlFor='image-1'>Image 1</label>
                                </div>

                                <div className='flex flex-col gap-1 justify-center items-center'>
                                    <div className='sm:mr-5'>
                                        <ImageUpload onFileSelect={(file) => handleImageSelect(1, file)} />
                                    </div>
                                    <label htmlFor='image-2'>Image 2</label>
                                </div>

                                <div className='flex flex-col gap-1 justify-center items-center'>
                                    <div>
                                        <ImageUpload onFileSelect={(file) => handleImageSelect(2, file)} />
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
                                    <input type='checkbox'
                                        id='vaccinated'
                                        name='vaccinated'
                                        checked={formData.vaccinated}
                                        onChange={handleChange}
                                        className=' hover:accent-black size-5 accent-purple-500'
                                    />
                                    <label htmlFor='vaccinated' className='ml-2'>Vaccinated</label></div>

                                <div className='flex flex-row items-center-safe sm:ml-10'>
                                    <input type='checkbox'
                                        id='neutered'
                                        name='neutered'
                                        checked={formData.neutered}
                                        onChange={handleChange}
                                        className=' hover:accent-black size-5 accent-purple-500'
                                    />
                                    <label htmlFor='neutered' className='ml-2'>Neutered/Spayed</label></div>

                            </div>

                            <div className='flex flex-col'>
                                <div className='left-auto'>Additional Health Notes</div>
                                <textarea
                                    id="health-notes"
                                    name="health_notes"
                                    value={formData.health_notes}
                                    onChange={handleChange}
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
    );
}

export default AddPets
