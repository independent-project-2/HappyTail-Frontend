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
    id: 5,
    title: "The Most Popular Dog Breeds of 2024",
    description: "Discover which dog breeds are capturing hearts this year. From the loyal Labrador to the energetic Border Collie, explore the top choices for families.",
    content: "Choosing the right dog breed is a major decision for any potential pet owner. This year's data from the Dog Aging Project reveals fascinating insights into our most beloved companions.\n\nLabrador Retrievers and Golden Retrievers continue to lead the pack due to their friendly nature and adaptability. However, we're seeing a rise in popularity for intelligent working breeds like the Australian Shepherd and the Border Collie. For those living in smaller spaces, the Pembroke Welsh Corgi and French Bulldog remain top contenders. Each breed brings its own unique personality and care requirements, so it's essential to research which one aligns best with your lifestyle.",
    image: "/assets/Images/blog-breeds.png",
    category: "Breeds",
    readTime: "7 min read",
    date: "Feb 04, 2024",
    author: "Dr. Sarah Wilson"
  },
  {
    id: 6,
    title: "A Guide to Balanced Pet Nutrition",
    description: "What goes into your pet's bowl matters. Learn how to choose the best food for your dog's age, weight, and activity level.",
    content: "Proper nutrition is the foundation of a long and healthy life for your pet. Just like humans, dogs require a balanced diet of proteins, fats, carbohydrates, vitamins, and minerals.\n\nWhen selecting a pet food, look for high-quality animal proteins as the first ingredient. Avoid 'fillers' like excessive corn or soy which provide less nutritional value. It's also important to adjust portions based on your dog's activity level and life stage—a puppy's needs are very different from those of a senior dog. Feeding the right amount not only keeps your pet at a healthy weight but also supports their immune system, joint health, and coat quality.",
    image: "/assets/Images/blog-nutrition.jpg",
    category: "Nutrition",
    readTime: "6 min read",
    date: "Feb 03, 2024",
    author: "Mark Thompson"
  },
  {
    id: 7,
    title: "The Importance of Interactive Play",
    description: "Playtime isn't just for fun—it's vital for your pet's mental and physical development. See why interactive toys are a must-have.",
    content: "Play is a natural behavior for dogs and serves as a crucial way for them to learn and stay fit. Interactive toys, like puzzle balls and chew rings, provide mental stimulation that prevents boredom and destructive behaviors.\n\nEngaging in play with your puppy strengthens the bond between you and helps them develop coordination and social skills. Whether it's a game of fetch in the yard or a quiet session with a squeaky toy indoors, regular playtime ensures your furry friend stays happy and sharp. Remember, a tired dog is a well-behaved dog!",
    image: "/assets/Images/blog-playtime.jpg",
    category: "Training",
    readTime: "5 min read",
    date: "Feb 02, 2024",
    author: "Emma Rodriguez"
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("Attempting to fetch blogs from backend...");
        const response = await fetch('http://localhost:5000/api/blogs');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log("Successfully fetched blogs:", data);
        // If we got data, merge it with existing BLOG_POSTS, avoiding duplicates by ID
        setPosts(prev => {
          const combined = [...prev, ...data];
          const unique = combined.filter((post, index, self) =>
            index === self.findIndex((p) => p.id === post.id)
          );
          return unique;
        });
      } catch (err) {
        console.log("Backend not available, using default data.", err);
      }
    };
    fetchBlogs();
  }, []);

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
  }, [posts, searchQuery]);

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

  const filteredPosts = posts.filter(post =>
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
        <div className="flex flex-col md:flex-row items-center justify-between mb-20">
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
        <div className="flex justify-center mb-16">
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
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(154,147,255,0.1)] transition-all duration-500 overflow-hidden flex flex-col h-full"
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
            <div className="bg-white rounded-[3rem] w-full py-24 flex flex-col items-center justify-center text-center">
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
