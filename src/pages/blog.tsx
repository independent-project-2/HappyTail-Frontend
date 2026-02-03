import { useState, useEffect } from "react";
import { Search, ArrowRight, X } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Pet Body Language",
    description: "Your pet communicates in ways beyond barks and meows. Learn how to read their subtle signs of happiness, stress, and affection.",
    content: "Understanding your pet's body language is essential for building a strong bond and ensuring their well-being. Dogs and cats have unique ways of expressing their emotions through ear positions, tail movements, and facial expressions.\n\nFor example, a wagging tail doesn't always mean a happy dog; sometimes it can indicate agitation. Similarly, a cat's slow blink is a sign of deep trust and love. By paying close attention to these non-verbal cues, you can better respond to your pet's needs and create a more harmonious home environment.",
    image: "/assets/Images/piclogo.png",
    category: "Pet Care",
    readTime: "5 min read",
    date: "Oct 24, 2024",
    author: "Dr. Sarah Wilson"
  },
  {
    id: 2,
    title: "Healthy Nutrition for Active Pets",
    description: "A balanced diet is the cornerstone of pet health. Discover the essential nutrients your furry friend needs for a long, vibrant life.",
    content: "Nutrition plays a critical role in your pet's energy levels and overall longevity. High-quality proteins, healthy fats, and essential vitamins are must-haves for any active companion. \n\nAvoid filler ingredients and pay attention to specific dietary needs based on age and activity level. Consult with your veterinarian to create a personalized meal plan that supports healthy joints, a shiny coat, and a strong immune system. Remember, what you put in their bowl today determines their health tomorrow.",
    image: "/assets/Images/piclogo.png",
    category: "Nutrition",
    readTime: "8 min read",
    date: "Oct 21, 2024",
    author: "Mark Thompson"
  },
  {
    id: 3,
    title: "The Joy of Senior Pet Adoption",
    description: "Older pets have so much love to give. Explore why adopting a senior animal might be the most rewarding decision you ever make.",
    content: "Adopting a senior pet is one of the most selfless and rewarding acts a pet lover can do. Older animals are often already trained, have calmer temperaments, and are deeply grateful for a second chance at happiness.\n\nWhile they may require more health checkups, the bond formed with a senior pet is incredibly deep. They provide a quiet, steady companionship that is perfect for many households. Give a senior pet their 'golden years' in a loving home, and they will repay you with unconditional devotion.",
    image: "/assets/Images/piclogo.png",
    category: "Adoption",
    readTime: "6 min read",
    date: "Oct 18, 2024",
    author: "Emma Rodriguez"
  },
  {
    id: 4,
    title: "Training Tips for New Puppy Owners",
    description: "Bringing home a puppy is exciting but challenging. Get started on the right paw with these essential training foundations.",
    content: "The first few months with a new puppy are crucial for setting lifelong habits. Start with positive reinforcement techniques, patience, and consistency. \n\nFocus on socialization, basic commands like 'sit' and 'stay', and crate training. Keep training sessions short and fun to maintain their curiosity. Building a foundation of trust early on will ensure your puppy grows into a well-behaved and confident adult dog. Don't forget that mistakes are part of the learning process for both of you!",
    image: "/assets/Images/piclogo.png",
    category: "Training",
    readTime: "10 min read",
    date: "Oct 15, 2024",
    author: "David Chen"
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

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

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost]);

  const filteredPosts = BLOG_POSTS.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFF5F9] pt-32 pb-20 overflow-hidden font-sans">
      {/* Background Soft Gradient */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white via-[#FFF5F9] to-[#F1F0FF] -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header Section - Matching the Home Page Design Language */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 reveal">
          <div className="md:w-3/5 text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-[#1A1A2E] leading-tight mb-6 tracking-tight">
              Explore Our <span className="text-[#FF6B00]">Pet</span> <br />
              Knowledge Blog
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-xl leading-relaxed mb-8">
              Every pet deserves a loving environment. Discover the latest tips and heartfelt stories tailored for pet families and animal lovers.
            </p>
          </div>
          {/* Decorative Cat/Paw Element area (Following the cat image placement in the original) */}
          <div className="md:w-2/5 mt-12 md:mt-0 relative hidden lg:block">
            <div className="relative w-full aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#9A93FF]/20 to-[#FF6B00]/10 rounded-full blur-3xl opacity-50" />
              <img
                src="/assets/Images/piclogo.png"
                alt="Blog Pets"
                className="relative z-10 w-4/5 h-4/5 object-contain rotate-6 hover:rotate-0 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Search Bar Section - Simplified UI */}
        <div className="flex justify-center mb-16 reveal">
          <div className="relative w-full max-w-xl group">
            <div className="relative flex items-center bg-white rounded-full border border-slate-200 px-6 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all">
              <Search className="text-[#9A93FF] w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="What do you want to learn today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-slate-700 font-medium outline-none placeholder-slate-400 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Blog Posts Grid - Matching Card Styles */}
        <div className="w-full">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="reveal group bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(154,147,255,0.1)] transition-all duration-500 overflow-hidden flex flex-col h-full"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={post.title}
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#9A93FF] text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 group-hover:text-[#FF6B00] transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {post.description}
                    </p>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-[#FF6B00] font-bold text-sm flex items-center gap-2 group/btn"
                    >
                      Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="reveal bg-white rounded-[3rem] w-full py-24 flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">No matching posts found</h3>
              <p className="text-slate-400 font-medium px-4">Try searching for something else!</p>
            </div>
          )}
        </div>


        {/* Article Modal - Redesigned for Theme Consistency */}
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 overflow-hidden">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500"
              onClick={() => setSelectedPost(null)}
            />

            <div className="relative w-full max-w-3xl h-full md:h-auto md:max-h-[85vh] bg-white md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-[#FF6B00] transition-all"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto">
                <div className="relative w-full h-56 md:h-80 overflow-hidden">
                  <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                <div className="px-6 md:px-12 py-10">
                  <div className="flex items-center gap-3 text-[10px] text-[#9A93FF] font-bold uppercase tracking-widest mb-4">
                    <span>{selectedPost.category}</span>
                    <span className="w-1 h-1 bg-[#9A93FF] rounded-full" />
                    <span>{selectedPost.author}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6 leading-tight">
                    {selectedPost.title}
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-[#1A1A2E] font-bold leading-relaxed mb-6">
                      {selectedPost.description}
                    </p>
                    <div className="text-slate-600 font-medium leading-relaxed whitespace-pre-line text-base">
                      {selectedPost.content}
                    </div>
                  </div>
                  <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="px-10 py-3 bg-[#FF6B00] text-white rounded-full font-bold shadow-lg hover:bg-[#e66000] transition-all active:scale-95"
                    >
                      Done Reading
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
