export default function Blog() {
  return (
    <div className="bg-[#FAFAFA] min-w-screen min-h-screen overflow-hidden">
      <div className="w-full h-[139px] absolute left-0 top-0">
        <svg
          width="2000"
          height="615"
          viewBox="0 0 1440 615"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" w-screen"
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
      <p className="font-medium text-[40px] w-[578px] h-[71px] absolute left-[431px] top-[173px] text-center">
        About your pets knowledge
      </p>
      <p className="text-[#595858] font-alegreya text-[21px] font-medium w-[888px] h-[87px] absolute left-[276px] top-[278px] text-center">
        is simply dummy text of the printing and typesetting industry. has been
        the industry's standard ever since the 1500s,
      </p>



      <div className="w-[509px] h-[77px] absolute left-[465px] top-[404px]">
        <div className="rounded-[100px] border border-[#CEC6C6] bg-[#FFF] w-[509px] h-[77px] absolute left-0 top-0"></div>
        <input 
          type="text"
          placeholder="Search blog posts..."
          className="text-[#595858] font-medium text-[20px] w-[350px] h-[53px] absolute left-[100px] top-[12px] bg-transparent outline-none"
        />
      </div>
      <div className="w-24 h-[134px] absolute left-[672px] top-[622px]"></div>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 absolute left-[502px] top-[423px] overflow-hidden "
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
      <div className="w-[1325px] h-[567px] absolute left-[57px] top-[689px]">
        <div className="rounded-[10px] bg-[#FFF] shadow-lg w-[407px] h-[567px] absolute left-0 top-0"></div>
        <div className="rounded-[10px] bg-[#FFF] shadow-lg w-[407px] h-[567px] absolute left-[459px] top-0"></div>
        <div className="rounded-[10px] bg-[#FFF] shadow-lg w-[407px] h-[567px] absolute left-[918px] top-0"></div>
      </div>
      <img
        src="/Rectangle11.png"
        className="rounded-2xl w-[360px] h-[265px] absolute left-[81px] top-[708px] max-w-none"
        alt="Rectangle 11"
      />
      <img
        src="/Rectangle12.png"
        className="rounded-2xl w-[360px] h-[265px] absolute left-[542px] top-[708px] max-w-none"
        alt="Rectangle 12"
      />
      <img
        src="/Rectangle13.png"
        className="rounded-2xl w-[360px] h-[265px] absolute left-[1003px] top-[708px] max-w-none"
        alt="Rectangle 13"
      />
      <p className="text-[#000] font-youngSerif text-[25px] w-[372px] h-[70px] absolute left-[81px] top-[997px]">
        is simply dummy text printing
      </p>
      <p className="text-[#696767] font-abhayaLibreMedium text-[22px] font-medium w-[363px] h-[98px] absolute left-[81px] top-[1091px]">
         is simply dummy text of the printing and typesetting Ipsum has been the
        industry's
      </p>
      <p className="text-[#000] font-youngSerif text-[25px] w-[372px] h-[70px] absolute left-[549px] top-[997px]">
        Pet care tips and advice
      </p>
      <p className="text-[#696767] font-abhayaLibreMedium text-[22px] font-medium w-[363px] h-[98px] absolute left-[549px] top-[1091px]">
        Learn the best practices for keeping your pets healthy, happy, and well-adjusted at home
      </p>
      <p className="text-[#000] font-youngSerif text-[25px] w-[372px] h-[70px] absolute left-[1003px] top-[997px]">
        is simply dummy text printing
      </p>
      <p className="text-[#696767] font-abhayaLibreMedium text-[22px] font-medium w-[363px] h-[98px] absolute left-[1003px] top-[1091px]">
         is simply dummy text of the printing and typesetting Ipsum has been the
        industry's
      </p>
    </div>
  );
}
