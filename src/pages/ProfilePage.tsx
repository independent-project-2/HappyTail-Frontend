import { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Mail, MapPin, Phone, Heart, Plus, Package,
    Clock, Trash2, BookOpen, Camera, X, Check
} from 'lucide-react';

const userStats = [
    { label: 'Pets Listed', value: '4', icon: <Package className="text-blue-500" size={20} /> },
    { label: 'Pets Adopted', value: '2', icon: <Heart className="text-pink-500" size={20} /> },
    { label: 'Member Since', value: '2025', icon: <Clock className="text-orange-500" size={20} /> },
];

interface Pet {
    id: number;
    name: string;
    type: string;
    breed: string;
    status: 'Available' | 'Adopted';
    image: string;
}

const initialPets: Pet[] = [
    { id: 1, name: 'Buddy', type: 'Dog', breed: 'Golden Retriever', status: 'Available', image: '/assets/Images/piclogo.png' },
    { id: 2, name: 'Luna', type: 'Cat', breed: 'Persian', status: 'Adopted', image: '/assets/Images/piclogo.png' }
];

interface Blog {
    id: number;
    title: string;
    text: string;
    image: string;
    date: string;
}

const initialBlogs: Blog[] = [
    { id: 1, title: 'Pet Care Tips', text: 'How to take care of your golden retriever...', image: '/assets/Images/piclogo.png', date: 'Jan 27, 2026' }
];

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
            // Create a preview URL for the local session
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
                {/* 4-column layout for better balance on ultra-wide screens */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">

                    {/* Left Column: User Card */}
                    <div className="lg:col-span-1 space-y-6 md:space-y-8">
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100 overflow-hidden relative">
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
                                <div className="w-full mt-6 pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 md:gap-4">
                                    {userStats.map((stat, idx) => (
                                        <div key={idx} className="text-center group cursor-help">
                                            <div className="flex justify-center mb-1 group-hover:scale-110 transition-transform">{stat.icon}</div>
                                            <div className="text-sm md:text-lg font-bold text-slate-800">{stat.value}</div>
                                            <div className="text-[7px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Columns Grid */}
                    <div className="lg:col-span-3 space-y-6 md:space-y-8">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 items-start">

                            {/* Listings Section with Custom Sort/Filter */}
                            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col h-full">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold text-slate-900">Your Listings</h2>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {['All', 'Available', 'Adopted'].map((f) => (
                                                <button key={f} onClick={() => setPetFilter(f as any)} className={`px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold border transition-all ${petFilter === f ? 'bg-[#9A93FF] border-[#9A93FF] text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-purple-200'}`}>{f}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={() => navigate('/add-pets')} className="w-full sm:w-auto px-5 py-2.5 bg-[#9A93FF] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#827afe] transition-all active:scale-95 text-sm shadow-md">
                                        <Plus size={18} /> Add New
                                    </button>
                                </div>

                                <div className="space-y-4 flex-1">
                                    {filteredPets.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-10 text-slate-400 italic text-sm">
                                            No listings found match your filter.
                                        </div>
                                    ) : (
                                        filteredPets.map((pet) => (
                                            <div
                                                key={pet.id}
                                                className={`group bg-slate-50 rounded-2xl p-3 border border-transparent hover:border-purple-100 hover:bg-white transition-all duration-300 hover:shadow-lg transform ${deletingPetId === pet.id ? 'scale-95 opacity-0 -translate-x-4' : 'scale-100 opacity-100'}`}
                                            >
                                                <div className="flex gap-4 items-center">
                                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden relative shrink-0 shadow-sm transition-transform group-hover:scale-105">
                                                        <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                                                        <div className={`absolute top-1 left-1 px-1.5 py-0.5 ${pet.status === 'Available' ? 'bg-green-500' : 'bg-slate-500'} text-[6px] md:text-[7px] text-white rounded font-bold uppercase`}>{pet.status}</div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-center gap-2">
                                                            <div className="truncate">
                                                                <h3 className="text-sm md:text-base font-bold text-slate-900 truncate">{pet.name}</h3>
                                                                <p className="text-[10px] md:text-xs text-slate-500 font-medium truncate">{pet.breed}</p>
                                                            </div>
                                                            <button
                                                                onClick={() => handleDeletePet(pet.id)}
                                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0"
                                                                title="Delete listing"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Privacy Section (Keeping it balanced) */}
                            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col h-full">
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Privacy</h2>
                                <p className="text-slate-400 text-[10px] md:text-xs font-medium uppercase tracking-wider mb-6 md:mb-8">Account Control</p>
                                <div className="space-y-3 md:space-y-4">
                                    {[{ title: 'Contact Info', desc: 'Show phone on listings', default: true }, { title: 'Notifications', desc: 'Email alerts', default: true }, { title: 'Visibility', desc: 'Public profile', default: false }].map((setting, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl">
                                            <div className="pr-2 md:pr-4">
                                                <div className="font-bold text-slate-800 text-xs md:text-sm">{setting.title}</div>
                                                <div className="text-[9px] md:text-[10px] text-slate-500 font-medium">{setting.desc}</div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                                <input type="checkbox" defaultChecked={setting.default} className="sr-only peer" />
                                                <div className="w-9 h-5 md:w-10 md:h-5 bg-slate-200 rounded-full peer peer-checked:bg-[#9A93FF] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 md:mt-8 pt-6 border-t border-slate-50">
                                    <button className="w-full py-3 md:py-4 bg-slate-900 text-white rounded-xl md:rounded-2xl font-bold text-xs md:text-sm hover:bg-black transition-all active:scale-95 shadow-lg">Update Settings</button>
                                </div>
                            </div>
                        </div>

                        {/* Your Blogs Section */}
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 md:mb-10">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3"><BookOpen className="text-[#9A93FF]" /> Your Blogs</h2>
                                    <p className="text-slate-500 font-medium text-sm">Manage your published articles</p>
                                </div>
                                <button onClick={() => setShowBlogModal(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 pl-4 pr-6 py-3 bg-[#9A93FF] hover:bg-[#827afe] text-white rounded-xl md:rounded-2xl font-bold transition-all shadow-xl shadow-purple-100 active:scale-95">
                                    <Plus size={20} /> Create Post
                                </button>
                            </div>

                            {blogs.length === 0 ? (
                                <div className="py-12 md:py-20 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/30">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"><BookOpen size={24} className="text-slate-200 md:hidden" /><BookOpen size={32} className="text-slate-200 hidden md:block" /></div>
                                    <p className="text-slate-400 font-bold text-sm md:text-base">No blogs yet. Share your first story!</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {blogs.map((blog) => (
                                        <div key={blog.id} className={`group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-purple-50 transition-all duration-300 transform ${deletingId === blog.id ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
                                            <div className="h-40 md:h-44 relative bg-slate-100">
                                                <img src={blog.image || '/assets/Images/piclogo.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <button onClick={() => handleDeleteBlog(blog.id)} className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-md text-red-500 rounded-xl flex items-center justify-center sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm">
                                                    <Trash2 size={18} className="md:hidden" />
                                                    <Trash2 size={20} className="hidden md:block" />
                                                </button>
                                            </div>
                                            <div className="p-5 md:p-6">
                                                <div className="text-[10px] font-bold text-[#9A93FF] uppercase tracking-widest mb-2">{blog.date}</div>
                                                <h3 className="text-lg md:text-xl font-bold text-slate-900 line-clamp-1 mb-2 leading-tight">{blog.title}</h3>
                                                <p className="text-slate-500 text-[10px] md:text-xs line-clamp-2 leading-relaxed">{blog.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Blog Modal */}
            {showBlogModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/40 backdrop-blur-md animate-fade-in">
                    <div className="bg-white w-full max-w-xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 relative shadow-2xl animate-pop-in max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setShowBlogModal(false)} className="absolute top-6 right-6 md:top-8 md:right-8 p-2 md:p-3 hover:bg-slate-50 rounded-xl md:rounded-2xl transition-colors">
                            <X className="text-slate-400 md:hidden" size={20} />
                            <X className="text-slate-400 hidden md:block" size={24} />
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
                                            <Camera className="text-slate-300 group-hover:text-[#9A93FF] transition-colors md:hidden" size={32} />
                                            <Camera className="text-slate-300 group-hover:text-[#9A93FF] transition-colors hidden md:block" size={40} />
                                            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Click to upload cover from your device</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 md:py-5 bg-[#9A93FF] text-white rounded-xl md:rounded-2xl font-bold hover:bg-[#827afe] shadow-xl shadow-purple-100 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base">
                                Publish Now
                                <Check className="md:hidden" size={18} />
                                <Check className="hidden md:block" size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
