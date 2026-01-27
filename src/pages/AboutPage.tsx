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
        <div className="min-h-screen bg-[#FFF5F9] pt-32 pb-20 overflow-hidden font-sans">
            {/* Background Soft Gradient */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white via-[#FFF5F9] to-[#F1F0FF] -z-10" />

            <div className="max-w-7xl mx-auto px-6 relative">

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 reveal">
                    <div className="space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#9A93FF]/20 text-[#9A93FF] rounded-full text-sm font-bold tracking-wide uppercase shadow-sm">
                            <Sparkles size={16} />
                            Our Mission
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-[#1A1A2E] leading-tight tracking-tight">
                            Connecting hearts, <br />
                            <span className="text-[#FF6B00]">one paw</span> at a time.
                        </h1>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                            HappyTails is more than just a platform; it's a community dedicated to finding loving homes for every pet. Every rescue story is a testament to the power of human-animal connection.
                        </p>
                        <div className="flex flex-wrap gap-5">
                            <button className="px-10 py-4 bg-[#FF6B00] text-white rounded-full font-bold shadow-lg hover:bg-[#e66000] transition-all transform hover:-translate-y-1 active:scale-95 group flex items-center gap-2">
                                Browse Pets <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-10 py-4 bg-white border border-[#FF6B00] text-[#FF6B00] rounded-full font-bold hover:bg-[#FFF5F0] transition-all transform hover:-translate-y-1 active:scale-95">
                                Our Story
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 w-full animate-float-slow">
                            <img
                                src="/assets/Images/piclogo.png"
                                alt="Happy Pets"
                                className="w-full h-auto object-contain scale-110"
                            />
                        </div>
                        {/* Soft Blending Glows */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#9A93FF]/20 via-[#FF6B00]/10 to-transparent rounded-full blur-[100px] -z-10 animate-pulse" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#9A93FF] rounded-full opacity-20 blur-[120px]" />
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF6B00] rounded-full opacity-10 blur-[120px]" />
                    </div>
                </div>

                {/* Values Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40 reveal text-center">
                    {[
                        {
                            title: 'Trust & Safety',
                            desc: 'We verify every profile to ensure a safe environment for both pets and humans.',
                            icon: <Shield className="text-[#9A93FF]" size={32} />,
                            bg: 'bg-purple-50'
                        },
                        {
                            title: 'Community First',
                            desc: 'Built by pet lovers, for pet lovers. We support each other in the journey of adoption.',
                            icon: <Users className="text-[#FF6B00]" size={32} />,
                            bg: 'bg-orange-50'
                        },
                        {
                            title: 'Pure Joy',
                            desc: 'The happiness of a pet finding its forever home is what drives us every single day.',
                            icon: <Heart className="text-red-400" size={32} />,
                            bg: 'bg-red-50'
                        }
                    ].map((value, idx) => (
                        <div key={idx} className="relative group">
                            <div className="absolute inset-0 bg-white/40 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative p-10 rounded-[2.5rem] hover:bg-white/60 transition-all duration-500">
                                <div className={`w-16 h-16 ${value.bg} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{value.title}</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                    {value.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mission Details */}
                <div className="space-y-40 mb-40">
                    {/* Background and Motivation */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center reveal">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#FF6B00]/5 rounded-full blur-3xl" />
                            <div className="relative p-10 md:p-14 rounded-[3.5rem] animate-float-gentle">
                                <div className="absolute inset-0 bg-white/40 blur-2xl -z-10" />
                                <h3 className="text-2xl font-bold text-[#1A1A2E] mb-8 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center"><Sparkles size={20} className="text-[#FF6B00]" /></div>
                                    Why This Matters
                                </h3>
                                <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
                                    <p>
                                        Across the world, countless pets are abandoned not from lack of compassion, but because adoption remains disconnected. Shelters struggle, while adopters face confusion.
                                    </p>
                                    <p className="p-8 bg-[#1A1A2E]/90 text-white rounded-[2rem] italic">
                                        "HappyTails was born to bridge this gap, modernizing the journey for everyone involved."
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <h2 className="text-4xl md:text-6xl font-bold text-[#1A1A2E] leading-tight tracking-tight">
                                Our Hearts, <br /> Our <span className="text-[#FF6B00]">Motivation.</span>
                            </h2>
                            <p className="text-lg text-slate-500 font-medium max-w-sm">
                                Creating a digital sanctuary where every wag and purr counts.
                            </p>
                        </div>
                    </div>

                    {/* Proposed Solution */}
                    <div className="reveal relative p-10 md:p-16 overflow-hidden">
                        <div className="absolute inset-0 bg-white/30 blur-3xl -z-10" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-bold text-[#1A1A2E] leading-tight mb-12 tracking-tight text-center">
                                The <span className="text-[#9A93FF]">HappyTails</span> Ecosystem.
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="p-8 rounded-3xl group-hover:bg-white/40 transition-all text-center">
                                    <Heart className="text-pink-500 mb-4 mx-auto" />
                                    <h4 className="text-lg font-bold text-[#1A1A2E] mb-2">Real-time Adoption</h4>
                                    <p className="text-sm text-slate-500 font-medium">Instantly discover pets in need of a forever home.</p>
                                </div>
                                <div className="p-8 rounded-3xl group-hover:bg-white/40 transition-all text-center">
                                    <Users className="text-[#9A93FF] mb-4 mx-auto" />
                                    <h4 className="text-lg font-bold text-[#1A1A2E] mb-2">Member Community</h4>
                                    <p className="text-sm text-slate-500 font-medium">Connect with fellow animal lovers and share advice.</p>
                                </div>
                                <div className="p-8 rounded-3xl group-hover:bg-white/40 transition-all text-center">
                                    <Shield className="text-[#FF6B00] mb-4 mx-auto" />
                                    <h4 className="text-lg font-bold text-[#1A1A2E] mb-2">Safe Rehoming</h4>
                                    <p className="text-sm text-slate-500 font-medium">A secure environment for pet owners and shelters.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-40 reveal">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold text-[#1A1A2E] tracking-tight mb-4">
                            The Teams Behind <span className="text-[#FF6B00]">Joy</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
                            The passionate individuals working tirelessly to make every adoption a success story.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 px-4">
                        {[
                            { name: "Devindi", role: "Frontend Dev", img: "member0.png", delay: "0s" },
                            { name: "Imalka", role: "Full Stack Dev", img: "member1.jpg", delay: "1.2s" },
                            { name: "Thushitha", role: "Project Manager", img: "member2.png", delay: "2.4s" },
                            { name: "Hasith", role: "Full Stack Dev", img: "member3.jpg", delay: "3.6s" },
                            { name: "Daniru", role: "QA Engineer", img: "member4.jpg", delay: "4.8s" }
                        ].map((member, idx) => (
                            <div key={idx} className="flex flex-col items-center group">
                                <div
                                    className="relative w-40 h-40 md:w-44 md:h-44 mb-8 animate-float-circular"
                                    style={{ animationDelay: member.delay }}
                                >
                                    <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF6B00]/40 to-[#9A93FF]/40 rounded-full opacity-20 group-hover:opacity-100 blur transition-all duration-700 animate-spin-slow" />
                                    <div className="relative w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden z-10 bg-white">
                                        <img
                                            src={`/assets/team/${member.img}`}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#FF6B00] rounded-full shadow-lg flex items-center justify-center text-white z-20">
                                        <PawPrint size={18} />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-[#1A1A2E]">{member.name}</h3>
                                    <p className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest mt-1">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Journey Stats */}
                <div className="bg-[#1A1A2E] rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden reveal shadow-2xl shadow-purple-900/10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B00] rounded-full blur-[180px] opacity-10 -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9A93FF] rounded-full blur-[180px] opacity-10 -ml-48 -mb-48" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Our Journey So Far</h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-12 font-medium">
                                What started as a passion project in 2024 has grown into a vibrant community. Every day, we work to bridge the gap between pets and their forever families.
                            </p>
                            <div className="grid grid-cols-2 gap-12">
                                <div>
                                    <div className="text-5xl font-bold text-[#FF6B00] mb-2 tracking-tighter">500+</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Shelters Joined</div>
                                </div>
                                <div>
                                    <div className="text-5xl font-bold text-[#9A93FF] mb-2 tracking-tighter">15k+</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Active Members</div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:block aspect-video bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 flex items-center justify-center p-1 relative group cursor-pointer overflow-hidden text-center">
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform">
                                    <ArrowRight size={32} className="text-white" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Watch Our Journey</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
