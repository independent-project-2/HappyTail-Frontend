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
        <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-auto'>
            {/* Background decorative elements */}
            <div className='fixed top-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10' />
            <div className='fixed bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10' />

            <div className='p-4 md:p-8 pt-20 md:pt-24 flex flex-col text-slate-900 justify-center items-center min-h-screen'>
                {/* Header Section */}
                <div className='flex flex-col items-center gap-3 mb-12 max-w-2xl'>
                    <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold'>
                            🐾
                        </div>
                        <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
                            {isEditMode ? 'Edit Pet Profile' : 'Add Your Pet'}
                        </h1>
                    </div>
                    <p className='text-slate-600 text-center text-lg'>{isEditMode ? 'Update your pet\'s information to keep it fresh and accurate' : 'Help your furry friend find the perfect new home'}</p>
                </div>

                <form
                    id="pet-form"
                    onSubmit={handleSubmit}
                    className='flex flex-col lg:grid lg:grid-cols-3 gap-6 w-full max-w-7xl'
                >
                    {/*Left Side Section*/}
                    {/*Basic Information Section*/}
                    <div className='lg:col-span-2 space-y-6'>
                        {/* Basic Info Card */}
                        <div className='bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-lg hover:shadow-purple-100 transition-all duration-300'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold'>
                                    📋
                                </div>
                                <h2 className='text-2xl font-bold text-slate-900'>Basic Information</h2>
                            </div>

                            <div className='space-y-5'>
                                {/* Row 1: Name and Type */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="name" className='text-sm font-bold text-slate-700 mb-2 block'>Pet Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder='e.g., Buddy, Luna, Max'
                                            className='px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-slate-50 hover:bg-white text-slate-900 placeholder-slate-400' />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="type" className='text-sm font-bold text-slate-700 mb-2 block'>Pet Type *</label>
                                        <input
                                            type="text"
                                            id="type"
                                            name="type"
                                            required
                                            value={formData.type}
                                            onChange={handleChange}
                                            placeholder='e.g., Dog, Cat, Rabbit'
                                            className='px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-slate-50 hover:bg-white text-slate-900 placeholder-slate-400' />
                                    </div>
                                </div>

                                {/* Row 2: Breed and Age */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="breed" className='text-sm font-bold text-slate-700 mb-2 block'>Breed *</label>
                                        <input
                                            type="text"
                                            id="breed"
                                            name="breed"
                                            required
                                            value={formData.breed}
                                            onChange={handleChange}
                                            placeholder='e.g., Golden Retriever'
                                            className='px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-slate-50 hover:bg-white text-slate-900 placeholder-slate-400' />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="age" className='text-sm font-bold text-slate-700 mb-2 block'>Age (Years)</label>
                                        <input
                                            type="number"
                                            id="age"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder='e.g., 3'
                                            className='px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-slate-50 hover:bg-white text-slate-900 placeholder-slate-400' />
                                    </div>
                                </div>

                                {/* Row 3: Location and Status */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="location" className='text-sm font-bold text-slate-700 mb-2 block'>Location</label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder='e.g., San Francisco, CA'
                                            className='px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-slate-50 hover:bg-white text-slate-900 placeholder-slate-400' />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="status" className='text-sm font-bold text-slate-700 mb-2 block'>Status</label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className='px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-slate-50 hover:bg-white text-slate-900 font-medium cursor-pointer'>
                                            <option value="AVAILABLE">Available</option>
                                            <option value="ADOPTED">Adopted</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 4: Price */}
                                <div className='flex flex-col'>
                                    <label htmlFor="price" className='text-sm font-bold text-slate-700 mb-2 block'>Price (Leave Blank for Free)</label>
                                    <div className='relative'>
                                        <span className='absolute left-4 top-3 text-slate-500 font-bold'>💰</span>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder='0'
                                            className='w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-slate-50 hover:bg-white text-slate-900' />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className='flex flex-col'>
                                    <label htmlFor="description" className='text-sm font-bold text-slate-700 mb-2 block'>Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder='Tell us about your pet... personality, temperament, special needs, etc.'
                                        className='px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-slate-50 hover:bg-white text-slate-900 placeholder-slate-400 resize-none h-32'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Health Information Card */}
                        <div className='bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold'>
                                    ❤️
                                </div>
                                <h2 className='text-2xl font-bold text-slate-900'>Health Information</h2>
                            </div>

                            <div className='space-y-5'>
                                {/* Health Checkboxes */}
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <label className='flex items-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 hover:border-green-400 cursor-pointer transition-all duration-200 hover:shadow-md group'>
                                        <input 
                                            type='checkbox'
                                            id='vaccinated'
                                            name='vaccinated'
                                            checked={formData.vaccinated}
                                            onChange={handleChange}
                                            className='w-5 h-5 accent-green-500 cursor-pointer' 
                                        />
                                        <span className='ml-3 font-semibold text-slate-700 group-hover:text-green-600 transition-colors'>Vaccinated</span>
                                    </label>

                                    <label className='flex items-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border-2 border-orange-200 hover:border-orange-400 cursor-pointer transition-all duration-200 hover:shadow-md group'>
                                        <input 
                                            type='checkbox'
                                            id='neutered'
                                            name='neutered'
                                            checked={formData.neutered}
                                            onChange={handleChange}
                                            className='w-5 h-5 accent-orange-500 cursor-pointer' 
                                        />
                                        <span className='ml-3 font-semibold text-slate-700 group-hover:text-orange-600 transition-colors'>Neutered/Spayed</span>
                                    </label>
                                </div>

                                {/* Health Notes */}
                                <div className='flex flex-col'>
                                    <label htmlFor="health_notes" className='text-sm font-bold text-slate-700 mb-2 block'>Additional Health Notes</label>
                                    <textarea
                                        id="health_notes"
                                        name="health_notes"
                                        value={formData.health_notes}
                                        onChange={handleChange}
                                        placeholder='Any medical conditions, allergies, or special care instructions...'
                                        className='px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-slate-50 hover:bg-white text-slate-900 placeholder-slate-400 resize-none h-28'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Right Side Section - Images*/}
                    <div className='lg:col-span-1'>
                        {/* Upload Images Card */}
                        <div className='bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-lg hover:shadow-pink-100 transition-all duration-300 sticky top-20'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white font-bold'>
                                    🖼️
                                </div>
                                <h2 className='text-2xl font-bold text-slate-900'>Pet Photos</h2>
                            </div>

                            <p className='text-sm text-slate-600 mb-6'>Upload up to 3 photos to showcase your pet. Photos help find the perfect match faster!</p>

                            <div className='space-y-4'>
                                {[
                                    { index: 0, label: 'Primary Photo', emoji: '📷' },
                                    { index: 1, label: 'Secondary Photo', emoji: '📸' },
                                    { index: 2, label: 'Additional Photo', emoji: '🎞️' }
                                ].map(({ index, label, emoji }) => (
                                    <div key={index} className='group'>
                                        <label className='flex items-center gap-3 p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg border-2 border-dashed border-pink-200 hover:border-pink-400 cursor-pointer transition-all duration-200 hover:shadow-md'>
                                            <div className='text-2xl'>{emoji}</div>
                                            <div className='flex-1'>
                                                <p className='font-semibold text-slate-900'>{label}</p>
                                                <p className='text-xs text-slate-500'>Click to upload</p>
                                            </div>
                                            <div className='hidden group-hover:block'>
                                                <span className='text-sm font-bold text-pink-500'>→</span>
                                            </div>
                                        </label>
                                        <div className='mt-2'>
                                            <ImageUpload onFileSelect={(file) => handleImageSelect(index, file)} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200'>
                                <p className='text-xs text-blue-700 font-semibold'>💡 Pro Tip: Use clear, well-lit photos of your pet from different angles for best results!</p>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Submit Button Section */}
                <div className='w-full max-w-7xl mt-8 flex flex-col sm:flex-row gap-4'>
                    <button
                        type="button"
                        onClick={() => navigate(isEditMode ? '/profile' : '/browse-pets')}
                        className='flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 border border-slate-200'
                    >
                        ← {isEditMode ? 'Back to Profile' : 'Cancel'}
                    </button>
                    <button
                        form="pet-form"
                        type="submit"
                        disabled={uploading}
                        className={`flex-1 py-3 px-6 font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 text-lg shadow-lg ${
                            uploading 
                                ? 'bg-slate-300 cursor-not-allowed text-slate-600' 
                                : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-purple-300 hover:shadow-lg'
                        }`}
                    >
                        {uploading ? (
                            <>
                                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                Uploading...
                            </>
                        ) : (
                            <>
                                {isEditMode ? '✏️ Update Pet' : '➕ Add Pet'}
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AddPets
