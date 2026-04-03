import ImageUpload from '../components/ImageUpload';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import { getCookie } from '../utils/cookies';

function AddPets() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingPetId, setEditingPetId] = useState<number | null>(null);

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
        status: 'AVAILABLE',
    });

    const [images, setImages] = useState<(File | null)[]>([null, null, null]);
    const [uploading, setUploading] = useState(false);

    // Check if we're editing a pet
    useEffect(() => {
        const editingPet = (location.state as any)?.editingPet;
        if (editingPet) {
            setIsEditMode(true);
            setEditingPetId(editingPet.id);
            const statusValue = editingPet.status === 'Available' ? 'AVAILABLE' : 'ADOPTED';
            setFormData({
                name: editingPet.name || '',
                type: editingPet.type || '',
                breed: editingPet.breed || '',
                age: editingPet.age?.toString() || '',
                location: editingPet.location || '',
                price: editingPet.price?.toString() || '',
                description: editingPet.description || '',
                vaccinated: editingPet.vaccinated || false,
                neutered: editingPet.neutered || false,
                health_notes: editingPet.health_notes || '',
                status: statusValue,
            });
            // Clear images array since editing doesn't pre-populate images
            setImages([null, null, null]);
        }
    }, [location.state]);

    const handleImageSelect = (index: number, file: File) => {
        setImages(prev => {
            const updated = [...prev];
            updated[index] = file;
            return updated;
        });
    };

    const uploadImages = async (token: string): Promise<string[]> => {
        const selectedImages = images.filter(img => img !== null);
        
        if (selectedImages.length === 0) {
            return [];
        }

        try {
            setUploading(true);
            const uploadedUrls: string[] = [];

            for (const image of selectedImages) {
                const formDataObj = new FormData();
                formDataObj.append("file", image);

                const response = await fetch(API_ENDPOINTS.pets.uploadImage, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formDataObj,
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Image upload failed:', errorText);
                    throw new Error(`Failed to upload image: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Image upload response:', data);
                
                // Extract the image URL from the response
                // Adjust based on your backend's response structure
                const imageUrl = data.url || data.imageUrl || data.data?.url;
                if (imageUrl) {
                    uploadedUrls.push(imageUrl);
                }
            }

            return uploadedUrls;
        } catch (err) {
            console.error('Error uploading images:', err);
            throw err;
        } finally {
            setUploading(false);
        }
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

        // Check required fields
        if (!formData.name || !formData.type || !formData.breed) {
            alert('Please fill in all required fields (Name, Type, Breed)');
            return;
        }

        try {
            setUploading(true);
            
            // Upload images first if any are selected
            let uploadedImageUrls: string[] = [];
            const hasImages = images.some(img => img !== null);
            
            if (hasImages) {
                console.log('Uploading images to Cloudinary...');
                uploadedImageUrls = await uploadImages(token);
                console.log('Images uploaded successfully:', uploadedImageUrls);
            }

            // Create pet with image URLs
            const jsonData = {
                name: formData.name,
                type: formData.type,
                breed: formData.breed,
                age: formData.age ? parseInt(formData.age) : 0,
                location: formData.location,
                price: formData.price ? parseInt(formData.price) : 0,
                description: formData.description,
                vaccinated: formData.vaccinated,
                neutered: formData.neutered,
                health_notes: formData.health_notes,
                status: formData.status,
                // Store all uploaded images as JSON string in ImageUrl field
                ...(uploadedImageUrls.length > 0 && { imageUrl: JSON.stringify(uploadedImageUrls) }),
            };

            console.log(isEditMode ? 'Updating pet with data:' : 'Creating pet with data:', jsonData);
            
            const endpoint = isEditMode && editingPetId 
                ? API_ENDPOINTS.pets.update(editingPetId.toString())
                : API_ENDPOINTS.pets.create;
            
            const method = isEditMode ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });

            if (!response.ok) {
                // Get response text first (can only read body once)
                const responseText = await response.text();
                console.error('Response status:', response.status, response.statusText);
                console.error('Response body:', responseText);
                
                let errorMessage = isEditMode ? 'Failed to update pet' : 'Failed to add pet';
                
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

            alert(isEditMode ? 'Pet updated successfully 🐾' : 'Pet added successfully 🐾');

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
                status: 'AVAILABLE',
            });
            setImages([null, null, null]);
            
            // Navigate back to profile if editing
            if (isEditMode) {
                navigate('/profile');
            }
        } catch (err) {
            console.error('Error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please check your connection and try again.';
            alert(errorMessage);
        } finally {
            setUploading(false);
        }
    };




    return (
        <div className='min-h-screen overflow-auto'>
            <div className='p-4 md:p-10 pt-16 md:pt-20 flex flex-col text-black justify-center items-center'>
                <div className='flex flex-col items-center gap-2'>
                    <h1 className='text-xl md:text-2xl font-bold'>{isEditMode ? 'Edit Pet' : 'Add Your Pets'}</h1>
                    <div className='text-lg md:text-2xl text-center'>{isEditMode ? 'Update your pet\'s information' : 'Help your pet find the perfect new home'}</div>
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

                        <div className='flex flex-col md:flex-row gap-4 md:gap-20'>
                            <div className='flex flex-col w-full md:w-auto'>
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className='border-solid border-2 border-gray-300 rounded-md p-1 w-full' >
                                    <option value="AVAILABLE">Available</option>
                                    <option value="ADOPTED">Adopted</option>
                                </select>
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
                                disabled={uploading}
                                className={`text-white text-lg md:text-2xl font-bold px-5 py-2 rounded-md w-full shadow-lg ${
                                    uploading 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-purple-500 hover:bg-purple-800 shadow-purple-300'
                                }`}
                            >
                                {uploading ? 'Uploading Images...' : (isEditMode ? 'Update Pet' : 'Add Pet')}
                            </button>
                        </div>
                    </div>



                </form>

            </div>

  
        </div>
    );
}

export default AddPets
