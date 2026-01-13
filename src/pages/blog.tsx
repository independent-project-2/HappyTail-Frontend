import { useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "is simply dummy text printing",
    description: "is simply dummy text of the printing and typesetting Ipsum has been the industry's",
    image: "/assets/Images/piclogo.png"
  },
  {
    id: 2,
    title: "Pet care tips and advice",
    description: "Learn the best practices for keeping your pets healthy, happy, and well-adjusted at home",
    image: "/assets/Images/piclogo.png"
  },
  {
    id: 3,
    title: "is simply dummy text printing",
    description: "is simply dummy text of the printing and typesetting Ipsum has been the industry's",
    image: "/assets/Images/piclogo.png"
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen w-full pt-20 md:pt-24">
      {/* Hero SVG Background */}
      <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 relative -mt-20 md:-mt-24">
        <svg
          viewBox="0 0 1440 615"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <g filter="url(#filter0_f_28_103)">
            <path
              d="M-15.7625 0H1440C1440 0 1440 371.974 1440 555.288C1440 738.602 -37.4979 397.18 -15.7625 555.288C5.97283 713.396 -15.7625 0 -15.7625 0Z"
              fill="#9A93FF"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_28_103"
              x="-20"
              y="-4"
              width="1464"
              height="619"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_28_103"
              />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-4 sm:mb-6 text-black">
            About your pets knowledge
          </h1>
          <p className="text-[#595858] font-alegreya text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto">
            is simply dummy text of the printing and typesetting industry. has been
            the industry's standard ever since the 1500s,
          </p>
        </div>

        {/* Search Bar Section */}
        <div className="flex justify-center mb-12 sm:mb-14 md:mb-16">
          <div className="relative w-full sm:w-96 md:w-auto">
            <div className="rounded-full border-2 border-[#CEC6C6] bg-white px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 shadow-sm">
              <svg
                width="24"
                height="24"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
              >
                <g clipPath="url(#clip0_27_74)">
                  <path
                    d="M30.7085 30.7083L39.1668 39.1667M18.3335 35.8333C8.6685 35.8333 0.833496 27.9983 0.833496 18.3333C0.833496 8.66834 8.6685 0.833344 18.3335 0.833344C27.9985 0.833344 35.8335 8.66834 35.8335 18.3333C35.8335 27.9983 27.9985 35.8333 18.3335 35.8333Z"
                    stroke="#9A93FF"
                    strokeWidth="2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_27_74">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-[#595858] font-medium text-sm sm:text-base md:text-lg flex-1 bg-transparent outline-none placeholder-[#999]"
              />
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="w-full">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full"
                >
                  <img
                    src={post.image}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    alt={post.title}
                  />
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-[#000] font-youngSerif text-lg sm:text-xl md:text-2xl mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[#696767] font-abhayaLibreMedium text-sm sm:text-base md:text-lg font-medium flex-grow">
                      {post.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white shadow-lg w-full py-16 sm:py-20 md:py-24 flex items-center justify-center">
              <p className="text-[#696767] font-medium text-base sm:text-lg md:text-xl text-center px-4">
                No blog posts found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
