import { useEffect } from 'react';
import { Heart, Shield, Users, Sparkles, ArrowRight, PawPrint } from 'lucide-react';

export default function AboutPage() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative">

                {/* Background Decorative Elements */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-30 animate-pulse" />
                <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] bg-blue-200 rounded-full blur-[150px] opacity-20 animate-pulse" />

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 reveal">
                    <div className="space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-purple-100 text-[#9A93FF] rounded-full text-sm font-bold tracking-wide uppercase shadow-sm">
                            <Sparkles size={16} />
                            Our Mission
                        </div>
                        <h1 className="text-5xl md:text-7xl font-[800] text-slate-900 leading-[1.05]">
                            Connecting hearts, <br /><span className="text-[#9A93FF]">one paw</span> at a time.
                        </h1>
                        <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
                            HappyTails is more than just a platform; it's a community dedicated to finding loving homes for every pet. We believe every soul deserves a companion.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <button className="px-10 py-4.5 bg-[#9A93FF] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#827afe] transition-all shadow-xl shadow-purple-200 active:scale-95 group">
                                Browse Pets <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-10 py-4.5 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="relative z-10 w-full aspect-square rounded-[3.5rem] md:rounded-[6rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] transform rotate-3 transition-transform group-hover:rotate-0 duration-700 border-8 border-white">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent z-10" />
                            <img
                                src="/assets/Images/piclogo.png"
                                alt="Happy Dog"
                                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                            />
                        </div>
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#9A93FF] rounded-full opacity-20 blur-3xl animate-bounce" />
                        <div className="absolute top-12 -right-12 w-32 h-32 bg-blue-400 rounded-[3rem] rotate-12 opacity-20 blur-2xl" />
                    </div>
                </div>

                {/* Values Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40 reveal">
                    {[
                        {
                            title: 'Trust & Safety',
                            desc: 'We verify every profile to ensure a safe environment for both pets and humans.',
                            icon: <Shield className="text-blue-500" size={36} />,
                            bg: 'bg-blue-50',
                            border: 'border-blue-100'
                        },
                        {
                            title: 'Community Driven',
                            desc: 'Built by pet lovers, for pet lovers. We support each other in the journey of adoption.',
                            icon: <Users className="text-purple-500" size={36} />,
                            bg: 'bg-purple-50',
                            border: 'border-purple-100'
                        },
                        {
                            title: 'Easy Adoption',
                            desc: 'Streamlined process to make bringing your new friend home as smooth as possible.',
                            icon: <PawPrint className="text-orange-500" size={36} />,
                            bg: 'bg-orange-50',
                            border: 'border-orange-100'
                        }
                    ].map((value, idx) => (
                        <div key={idx} className={`bg-white p-12 rounded-[3.5rem] border ${value.border} shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(154,147,255,0.2)] transition-all duration-500 group relative overflow-hidden`}>
                            <div className={`w-20 h-20 ${value.bg} rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                {value.icon}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-5">{value.title}</h3>
                            <p className="text-slate-500 font-semibold leading-relaxed">
                                {value.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Documentation Sections */}
                <div className="space-y-40 mb-40">

                    {/* Background and Motivation */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center reveal">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute -top-12 -left-12 w-full h-full bg-[#9A93FF]/10 rounded-[4rem] -rotate-2" />
                            <div className="relative bg-white p-10 md:p-14 rounded-[4rem] border border-slate-200 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.1)] animate-float-gentle">
                                <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center"><Sparkles size={24} className="text-[#9A93FF]" /></div>
                                    Background & Motivation
                                </h3>
                                <div className="space-y-6 text-slate-700 leading-relaxed font-semibold">
                                    <p>
                                        Across the world, countless pets are abandoned or surrendered—not from lack of compassion, but because adoption remains messy, outdated, and disconnected. Shelters struggle with limited tools, while adopters face scattered information.
                                    </p>
                                    <p>
                                        Studies show that streamlined systems dramatically improve placements, yet no widely used digital solution exists to unite everyone.
                                    </p>
                                    <p className="p-8 bg-slate-900 text-white rounded-[2.5rem] border-l-8 border-[#9A93FF] italic shadow-lg">
                                        "HappyTails closes this gap. By modernizing the adoption journey, it empowers shelters and supports owners in difficult times."
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-none italic tracking-tight">
                                Why we <br /> started this <br /> <span className="text-[#9A93FF] not-italic">Mission.</span>
                            </h2>
                            <p className="text-xl text-slate-500 font-bold max-w-sm">
                                Creating a digital sanctuary where transparency builds trust.
                            </p>
                        </div>
                    </div>

                    {/* Problem in Brief */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center reveal">
                        <div className="space-y-8">
                            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-none italic tracking-tight">
                                The <br /> <span className="text-red-500 not-italic">Broken</span> <br /> Adoption <br /> Path.
                            </h2>
                            <p className="text-xl text-slate-500 font-bold max-w-sm">
                                Identifying the gaps that keep pets and forever homes apart.
                            </p>
                        </div>
                        <div className="bg-slate-900 p-10 md:p-14 rounded-[4rem] text-white shadow-[0_40px_100px_-20px_rgba(15,23,42,0.5)] relative overflow-hidden group animate-float-gentle border border-slate-800">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] group-hover:bg-red-500/20 transition-all duration-700" />
                            <h3 className="text-3xl font-black mb-8 flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><Shield size={24} className="text-red-400" /></div>
                                Problem in Brief
                            </h3>
                            <div className="space-y-6 text-slate-300 leading-relaxed font-semibold">
                                <p>
                                    Pet adoption today is fragmented. Information is scattered across social media and unorganized websites, making it difficult for adopters to find pets that fit their lifestyle.
                                </p>
                                <p>
                                    Shelters face heavy workloads from manual data entry. As a result, they spend more time managing inquiries than caring for animals.
                                </p>
                                <div className="p-7 bg-white/5 rounded-3xl border border-white/10 mt-6 group-hover:bg-white/10 transition-colors">
                                    <p className="text-white font-black text-lg">
                                        Without a unified system, adoption rates drop, and pets remain in limbo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Proposed Solution */}
                    <div className="reveal">
                        <div className="bg-white rounded-[4rem] p-10 md:p-20 border border-slate-200 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.08)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-purple-50 rounded-full blur-[120px] opacity-50 -mr-40 -mt-40" />
                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                                <div className="lg:col-span-5">
                                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] mb-10 tracking-tighter">
                                        Our <br /><span className="text-[#9A93FF]">Unified</span> Solution.
                                    </h2>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="px-6 py-3 bg-slate-50 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-900 shadow-sm flex items-center gap-2 border border-slate-100">
                                            <Heart size={16} className="text-pink-500" /> Real-time tracking
                                        </div>
                                        <div className="px-6 py-3 bg-slate-50 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-900 shadow-sm flex items-center gap-2 border border-slate-100">
                                            <Users size={16} className="text-blue-500" /> Community focus
                                        </div>
                                        <div className="px-6 py-3 bg-slate-50 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-900 shadow-sm flex items-center gap-2 border border-slate-100">
                                            <Shield size={16} className="text-green-500" /> Secure rehoming
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-7 space-y-10">
                                    <div className="space-y-8">
                                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest">Proposed Solution & Significance</h3>
                                        <p className="text-xl text-slate-700 leading-relaxed font-bold">
                                            HappyTails is a centralized digital platform designed to modernize pet adoption and rehoming. It unites adopters, shelters, and pet owners in a secure system.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-lg transition-shadow">
                                                <div className="font-black text-slate-900 mb-3 uppercase tracking-wider text-xs">For Adopters</div>
                                                <div className="text-sm text-slate-500 leading-relaxed font-bold">
                                                    Advanced search tools and real-time availability help make confident, informed decisions.
                                                </div>
                                            </div>
                                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-lg transition-shadow">
                                                <div className="font-black text-slate-900 mb-3 uppercase tracking-wider text-xs">For Shelters</div>
                                                <div className="text-sm text-slate-500 leading-relaxed font-bold">
                                                    List pets, track requests, and communicate with adopters securely in one place.
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed font-semibold">
                                            By increasing visibility and promoting responsible ownership, HappyTails prevents overcrowding and ensures every pet has a fair chance at a home.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Our Team Contribution Section */}
                <div className="mb-40 reveal">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-purple-100 text-[#9A93FF] rounded-full text-sm font-bold tracking-wide uppercase shadow-sm mb-6">
                            <Users size={16} />
                            The Hearts Behind the Project
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                            Our Team <span className="text-[#9A93FF]">Contribution</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-bold mt-4 max-w-2xl mx-auto">
                            United by a shared love for animals, our team combines expertise in technology and design to build a better future for every pet in need.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 px-4">
                        {[
                            { name: "Devindi", role: "Frontend Dev", img: "member0.png", delay: "0s" },
                            { name: "Imalka", role: "Full Stack Dev", img: "member1.jpg", delay: "1s" },
                            { name: "Thushitha", role: "Project Manager & Tech Lead", img: "member2.png", delay: "2s" },
                            { name: "Hasith", role: "Full Stack Dev", img: "member3.jpg", delay: "3s" },
                            { name: "Daniru", role: "QA Engineer", img: "member4.jpg", delay: "4s" }
                        ].map((member, idx) => (
                            <div key={idx} className="flex flex-col items-center group">
                                <div
                                    className="relative w-40 h-40 md:w-44 md:h-44 mb-8 animate-float-circular"
                                    style={{ animationDelay: member.delay }}
                                >
                                    {/* Rotating Outer Ring */}
                                    <div className="absolute -inset-4 bg-gradient-to-tr from-[#9A93FF] via-purple-300 to-blue-400 rounded-full opacity-20 group-hover:opacity-40 blur-sm animate-spin-slow transition-opacity" />

                                    {/* Main Image Container */}
                                    <div className="relative w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden z-10 bg-slate-100">
                                        <img
                                            src={`/assets/team/${member.img}`}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Decorative Pet Icons */}
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#9A93FF] z-20 border-2 border-slate-50">
                                        <Heart size={16} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="text-center space-y-1">
                                    <h3 className="text-xl font-black text-slate-900">{member.name}</h3>
                                    <p className="text-sm font-black text-[#9A93FF] uppercase tracking-widest">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Secondary Content Section */}
                <div className="bg-slate-900 rounded-[5rem] p-12 md:p-24 text-white relative overflow-hidden reveal border border-slate-800 shadow-2xl">
                    <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#9A93FF] rounded-full blur-[150px] opacity-10 -mr-64 -mt-64" />
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Our Journey So Far</h2>
                            <p className="text-slate-400 text-xl leading-relaxed mb-12 font-medium">
                                What started as a passion project in 2024 has grown into a vibrant community. Every day, we work to bridge the gap between pets and their forever families.
                            </p>
                            <div className="grid grid-cols-2 gap-12">
                                <div>
                                    <div className="text-5xl font-black text-[#9A93FF] mb-2 tracking-tighter">500+</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Shelters Joined</div>
                                </div>
                                <div>
                                    <div className="text-5xl font-black text-[#9A93FF] mb-2 tracking-tighter">15k+</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Active Members</div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block aspect-video bg-white/5 backdrop-blur-md rounded-[3.5rem] border border-white/10 flex items-center justify-center p-1 relative group cursor-pointer overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#9A93FF]/20 to-transparent group-hover:opacity-100 transition-opacity" />
                            <div className="text-center relative z-10">
                                <div className="w-24 h-24 bg-[#9A93FF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                                    <ArrowRight size={40} className="text-white" />
                                </div>
                                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white/60">Watch Our Story</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
