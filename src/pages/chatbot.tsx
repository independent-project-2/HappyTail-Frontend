import { useState ,useEffect,useRef } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [started, setStarted] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, isTyping]);



  const handleSend = (): void => {
    if (!input.trim()) return;
    setStarted(true);
    const userMessage: Message = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const responses: string[] = [
        "That's a great question about your pet! Based on typical pet behavior, I'd recommend consulting with your veterinarian for personalized advice.",
        "Interesting! Every pet is unique, but generally speaking, this is quite common. Make sure your pet is comfortable and has access to fresh water.",
        "Thanks for asking! Pet care can be tricky. Consider checking your pet's diet and exercise routine, and don't hesitate to reach out to a professional if needed.",
        "I understand your concern. Regular check-ups with your vet are always a good idea to ensure your pet stays healthy and happy!",
        "That's wonderful to hear about your pet! Keeping a consistent routine and showing lots of love goes a long way in pet care."
      ];
      const randomResponse: string = responses[Math.floor(Math.random() * responses.length)];
      const aiMessage: Message = { role: "assistant", content: randomResponse };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);

    

  };

  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Center Section - Welcome Screen */}
      {!started && (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center items-center justify-center flex flex-col max-w-2xl">
            <div className="w-40 mb-6 animate-float"><img src="/assets/Images/logo.png" alt="Pet Care Assistant" /></div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to Pet Care Assistant
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Ask anything about your pets - from health tips to behavior questions
            </p>
            
          </div>
        </div>
      )}

      {/* Chat Area */}
      {started && (
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                {msg.role === "assistant" && (
                  <div className="w-10 h-10 bg-linear-to-br  to-purple-600 rounded-full flex items-center justify-center text-white text-xl mr-3 shrink-0 shadow-md">
                    🐾
                  </div>
                )}
                <div
                  className={`max-w-[70%] px-5 py-4 rounded-2xl shadow-md ${
                    msg.role === "user"
                      ? "bg-linear-to-r from-blue-500-500 to-purple-500-600 text-black"
                      : "bg-white text-gray-800 border border-gray-100"
                  }`}
                >
                  <p className="leading-relaxed">{msg.content}</p>
                  
                </div>
                {msg.role === "user" && (
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 rounded-full flex items-center justify-center text-white text-xl ml-3 shrink-0 shadow-md">
                    👤
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl mr-3 shrink-0 shadow-md">
                  🐾
                </div>
                <div className="bg-white px-5 py-4 rounded-2xl shadow-md border border-gray-100">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-6 py-2 border-2 border-gray-200 focus-within:border-purple-400 transition">
            <input
              type="text"
              placeholder="Ask about your pet..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
  if (e.key === "Enter" && !isTyping && input.trim()) {
    handleSend();
  }
}}
              autoFocus
              className="w-full bg-transparent focus:outline-none text-gray-700 text-lg placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`px-8 py-3 rounded-full font-semibold transition shadow-md ${
                input.trim() && !isTyping
                  ? "bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }` }
            >
              Send
            </button>
          </div>
         <p className="text-xs text-gray-400 text-center mt-3">
  Powered by <span className="font-semibold text-purple-500">HappyTail AI</span> • Your smart pet care assistant 
</p>

        </div>
      </div>
    </div>
  );
}