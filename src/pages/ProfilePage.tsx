import { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Mail, MapPin, Phone, Plus, Package,
    Trash2, BookOpen, Camera, X, Check, LogOut
} from 'lucide-react';

interface Pet {
    id: number;
    name: string;
    type: string;
    breed: string;
    status: 'Available' | 'Adopted';
    image: string;
}

interface Blog {
    id: number;
    title: string;
    text: string;
    image: string;
    date: string;
}


const initialPets: Pet[] = [
    { id: 1, name: 'Buddy', type: 'Dog', breed: 'Golden Retriever', status: 'Available', image: '/assets/Images/piclogo.png' },
    { id: 2, name: 'Luna', type: 'Cat', breed: 'Persian', status: 'Adopted', image: '/assets/Images/piclogo.png' }
];

const initialBlogs: Blog[] = [
    { id: 1, title: 'Pet Care Tips', text: 'How to take care of your golden retriever...', image: '/assets/Images/piclogo.png', date: 'Jan 27, 2026' }
];



const PetCard = ({ pet, onDelete, deletingId }: { pet: Pet, onDelete: (id: number) => void, deletingId: number | null }) => (
    <div
        className={`group bg-slate-50/50 rounded-3xl p-4 border border-transparent hover:border-purple-100 hover:bg-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-50 transform ${deletingId === pet.id ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
    >
        <div className="flex gap-5 items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden relative shrink-0 shadow-md group-hover:scale-105 transition-transform duration-500">
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                <div className={`absolute top-2 left-2 px-2 py-0.5 ${pet.status === 'Available' ? 'bg-green-500' : 'bg-slate-500'} text-[8px] text-white rounded-lg font-bold uppercase tracking-wider`}>
                    {pet.status}
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-4">
                    <div className="truncate">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 truncate mb-0.5">{pet.name}</h3>
                        <p className="text-xs md:text-sm text-slate-500 font-medium truncate mb-2">{pet.breed}</p>
                        <span className="px-2 py-0.5 bg-white border border-slate-100 rounded-md text-[9px] text-slate-400 font-bold uppercase">{pet.type}</span>
                    </div>
                    <button
                        onClick={() => onDelete(pet.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shrink-0 md:opacity-0 md:group-hover:opacity-100"
                        title="Delete listing"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const BlogCard = ({ blog, onDelete, deletingId }: { blog: Blog, onDelete: (id: number) => void, deletingId: number | null }) => (
    <div className={`group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-purple-50 transition-all duration-300 transform ${deletingId === blog.id ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="h-40 md:h-44 relative bg-slate-100">
            <img src={blog.image || '/assets/Images/piclogo.png'} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <button
                onClick={() => onDelete(blog.id)}
                className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-md text-red-500 rounded-xl flex items-center justify-center sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm"
            >
                <Trash2 size={18} />
            </button>
        </div>
        <div className="p-5 md:p-6">
            <div className="text-[10px] font-bold text-[#9A93FF] uppercase tracking-widest mb-2">{blog.date}</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 line-clamp-1 mb-2 leading-tight">{blog.title}</h3>
            <p className="text-slate-500 text-[10px] md:text-xs line-clamp-2 leading-relaxed">{blog.text}</p>
        </div>
    </div>
);

export default function ProfilePage() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const blogImageInputRef = useRef<HTMLInputElement>(null);

    // State management
    const [pets, setPets] = useState<Pet[]>(initialPets);
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [showBlogModal, setShowBlogModal] = useState(false);
    const [petFilter, setPetFilter] = useState<'All' | 'Available' | 'Adopted'>('All');
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [deletingPetId, setDeletingPetId] = useState<number | null>(null);

    // New blog draft state
    const [newBlog, setNewBlog] = useState({ title: '', text: '', image: '' });

    const handleButtonClick = () => fileInputRef.current?.click();
    const handleBlogImageTrigger = () => blogImageInputRef.current?.click();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) console.log('Selected file:', file.name);
    };

    const handleBlogImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {

            const previewUrl = URL.createObjectURL(file);
            setNewBlog(prev => ({ ...prev, image: previewUrl }));
        }
    };

    const handleDeleteBlog = (id: number) => {
        setDeletingId(id);
        setTimeout(() => {
            setBlogs(blogs.filter(b => b.id !== id));
            setDeletingId(null);
        }, 300);
    };

    const handleDeletePet = (id: number) => {
        setDeletingPetId(id);
        setTimeout(() => {
            setPets(pets.filter(p => p.id !== id));
            setDeletingPetId(null);
        }, 300);
    };

    const handleAddBlog = (e: React.FormEvent) => {
        e.preventDefault();
        const blog: Blog = {
            id: Date.now(),
            ...newBlog,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        setBlogs([blog, ...blogs]);
        setShowBlogModal(false);
        setNewBlog({ title: '', text: '', image: '' });
    };

    const filteredPets = useMemo(() => {
        if (petFilter === 'All') return pets;
        return pets.filter(p => p.status === petFilter);
    }, [pets, petFilter]);

    return (
        <div className="min-h-screen bg-[#FAFAFC] pt-24 pb-12 md:pt-32 md:pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">


                    <div className="space-y-6 md:space-y-8">
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100 overflow-hidden relative h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl opacity-50" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center border-4 border-white shadow-lg mb-4 md:mb-6 group relative">
                                    <User size={48} className="text-slate-400 group-hover:scale-110 transition-transform md:hidden" />
                                    <User size={64} className="text-slate-400 group-hover:scale-110 transition-transform hidden md:block" />
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                                    <button onClick={handleButtonClick} className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-[#9A93FF] text-white rounded-lg md:rounded-xl flex items-center justify-center border-2 md:border-4 border-white shadow-md hover:scale-110 transition-transform cursor-pointer">
                                        <Plus size={16} className="md:hidden" />
                                        <Plus size={20} className="hidden md:block" />
                                    </button>
                                </div>
                                <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Alex Thompson</h1>
                                <p className="text-slate-500 font-medium mb-6 md:mb-8 text-xs md:text-sm">Pet Enthusiast & Volunteer</p>
                                <div className="w-full space-y-3 text-left">
                                    {[
                                        { icon: <Mail size={16} />, label: 'Email', value: 'alex.t@example.com', color: 'text-purple-400' },
                                        { icon: <Phone size={16} />, label: 'Phone', value: '+1 (555) 123-4567', color: 'text-blue-400' },
                                        { icon: <MapPin size={16} />, label: 'Location', value: 'San Francisco, CA', color: 'text-orange-400' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-2.5 md:p-3 bg-slate-50 rounded-xl md:rounded-2xl transition-colors hover:bg-slate-100">
                                            <div className={`w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center ${item.color} shadow-sm`}>{item.icon}</div>
                                            <div className="text-[10px] md:text-xs">
                                                <div className="text-slate-400 font-bold uppercase">{item.label}</div>
                                                <div className="font-bold text-slate-700 truncate max-w-[120px] md:max-w-none">{item.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full mt-8 pt-6 border-t border-slate-100">
                                    <button
                                        onClick={() => navigate('/')}
                                        className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-red-50 hover:text-red-500 transition-all active:scale-95 group shadow-sm border border-slate-100"
                                    >
                                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="space-y-6 md:space-y-8 h-full">
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col h-full">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                                        <Package className="text-[#9A93FF]" size={24} /> Your Listings
                                    </h2>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {['All', 'Available', 'Adopted'].map((f) => (
                                            <button
                                                key={f}
                                                onClick={() => setPetFilter(f as 'All' | 'Available' | 'Adopted')}
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${petFilter === f ? 'bg-[#9A93FF] border-[#9A93FF] text-white shadow-sm' : 'bg-white border-slate-100 text-slate-400 hover:border-purple-200'}`}
                                            >
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={() => navigate('/add-pets')} className="w-auto px-4 py-2 bg-[#9A93FF] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#827afe] transition-all active:scale-95 text-xs shadow-sm shadow-purple-50">
                                    <Plus size={16} /> New
                                </button>
                            </div>

                            <div className="space-y-4 flex-1">
                                {filteredPets.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-10 text-slate-400 italic text-xs bg-slate-50/50 rounded-2xl border border-dashed border-slate-100">
                                        No listings found.
                                    </div>
                                ) : (
                                    filteredPets.map((pet) => (
                                        <PetCard
                                            key={pet.id}
                                            pet={pet}
                                            onDelete={handleDeletePet}
                                            deletingId={deletingPetId}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="space-y-6 md:space-y-8 h-full">
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col h-full">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                                        <BookOpen className="text-[#9A93FF]" size={24} /> Your Blogs
                                    </h2>
                                    <p className="text-slate-500 font-medium text-[10px]">Manage your articles</p>
                                </div>
                                <button onClick={() => setShowBlogModal(true)} className="w-auto px-4 py-2 bg-[#9A93FF] hover:bg-[#827afe] text-white rounded-xl font-bold transition-all active:scale-95 text-xs shadow-sm shadow-purple-50 flex items-center gap-2">
                                    <Plus size={16} /> Create
                                </button>
                            </div>

                            <div className="space-y-5 flex-1 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-slate-100">
                                {blogs.length === 0 ? (
                                    <div className="py-12 text-center border border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
                                        <BookOpen size={24} className="text-slate-200 mx-auto mb-2" />
                                        <p className="text-slate-400 font-bold text-xs">No blogs yet.</p>
                                    </div>
                                ) : (
                                    blogs.map((blog) => (
                                        <BlogCard
                                            key={blog.id}
                                            blog={blog}
                                            onDelete={handleDeleteBlog}
                                            deletingId={deletingId}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {showBlogModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/40 backdrop-blur-md animate-fade-in">
                    <div className="bg-white w-full max-w-xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 relative shadow-2xl animate-pop-in max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setShowBlogModal(false)} className="absolute top-6 right-6 md:top-8 md:right-8 p-2 md:p-3 hover:bg-slate-50 rounded-xl md:rounded-2xl transition-colors">
                            <X className="text-slate-400" size={24} />
                        </button>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">New Blog Post</h2>

                        <form onSubmit={handleAddBlog} className="space-y-4 md:space-y-6">
                            <div className="space-y-1 md:space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Blog Title</label>
                                <input required value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} type="text" placeholder="e.g., My New Pet Journey" className="w-full px-5 md:px-6 py-3 md:py-4 bg-slate-50 border-2 border-transparent rounded-xl md:rounded-2xl focus:border-purple-200 transition-all outline-none font-medium text-sm md:text-base" />
                            </div>
                            <div className="space-y-1 md:space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Story Text</label>
                                <textarea required value={newBlog.text} onChange={e => setNewBlog({ ...newBlog, text: e.target.value })} placeholder="Write your content here..." className="w-full px-5 md:px-6 py-3 md:py-4 bg-slate-50 border-2 border-transparent rounded-xl md:rounded-2xl focus:border-purple-200 transition-all outline-none font-medium h-32 md:h-44 resize-none text-sm md:text-base" />
                            </div>

                            <div className="space-y-1 md:space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">Cover Image</label>
                                <input type="file" ref={blogImageInputRef} onChange={handleBlogImageChange} className="hidden" accept="image/*" />
                                <div
                                    onClick={handleBlogImageTrigger}
                                    className="relative group cursor-pointer overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-dashed border-slate-200 hover:border-purple-200 hover:bg-purple-50 transition-all"
                                >
                                    {newBlog.image ? (
                                        <div className="relative h-32 md:h-44 w-full">
                                            <img src={newBlog.image} className="w-full h-full object-cover" alt="Preview" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="text-white" size={32} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-6 md:p-10 flex flex-col items-center justify-center space-y-2">
                                            <Camera className="text-slate-300 group-hover:text-[#9A93FF] transition-colors" size={40} />
                                            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Click to upload cover from your device</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 md:py-5 bg-[#9A93FF] text-white rounded-xl md:rounded-2xl font-bold hover:bg-[#827afe] shadow-xl shadow-purple-100 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base">
                                Publish Now
                                <Check size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
