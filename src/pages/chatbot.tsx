export default function Chatbot() {
  return (
    <div className="bg-[#ECEBFE] flex flex-col justify-center items-center h-screen">
         <img src="/assets/Images/logo.png" alt="Logo" className="h-55 w-auto mx-auto"/>
      <h1 className="text-gray-400 text-3xl font-bold text-center">Ask anything about your pets</h1>
      <input
        placeholder="Type your question here..."
        type="text"
        className= " p-3 mt-16 border placeholder-gray-400 text-gray-600 border-gray-300 rounded-4xl  mx-auto w-1/2"
      />
    </div>
  )
}