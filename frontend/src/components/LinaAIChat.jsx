import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Loader } from 'lucide-react';
import axios from 'axios';

function LinaAIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hi! I\'m Lina, your AI Safe Chat assistant. Feel free to ask me anything about sexual and reproductive health. Everything we discuss is private and confidential. 🔒'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');

        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await axios.post('/api/ai/chat', {
                message: userMessage,
                conversationId,
                history: messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                }))
            });

            const { response: aiResponse, conversationId: newConvId, crisis, escalated } = response.data;

            // Update conversation ID if new
            if (newConvId && !conversationId) {
                setConversationId(newConvId);
            }

            // Add AI response to chat
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: aiResponse,
                crisis,
                escalated
            }]);

        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = error.response?.data?.response ||
                "I'm having trouble responding right now. Please try again in a moment, or contact our support team at info@wekume.org.";

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: errorMessage,
                error: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Floating Lina Icon Button */}
            <button
                onClick={handleToggleChat}
                className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${isOpen ? 'scale-0 opacity-0 rotate-180' : 'scale-100 opacity-100 rotate-0'}`}
                aria-label="Open Lina AI Chat"
                title="Chat with Lina AI"
            >
                <div className="relative group flex items-center justify-center">
                    {/* Outer Rotating Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-blue-400 border-b-purple-500 border-l-blue-400 animate-spin-slow opacity-70 group-hover:opacity-100 transition-opacity w-full h-full scale-110"></div>

                    {/* Inner Reverse Rotating Ring */}
                    <div className="absolute inset-0 rounded-full border border-transparent border-t-blue-300 border-b-purple-300 animate-reverse-spin opacity-50 group-hover:opacity-80 transition-opacity w-full h-full scale-90"></div>

                    {/* Pulse Glow Effect */}
                    <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 animate-pulse-slow transition-opacity"></div>

                    {/* Main Icon Container */}
                    <div className="relative z-10 p-2 transition-transform duration-300 group-hover:scale-105">
                        <img
                            src="/assets/lina-logo.png"
                            alt="Lina AI"
                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain filter drop-shadow-lg"
                        />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-4 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none shadow-xl border border-white/10">
                        Chat with Lina AI
                        <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
                    </div>
                </div>
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
            >
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[90vw] sm:w-96 h-[600px] max-h-[80vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/lina-logo.png"
                                alt="Lina AI"
                                className="w-10 h-10 object-contain bg-white/20 rounded-full p-1"
                            />
                            <div>
                                <h3 className="font-bold text-lg">Lina AI</h3>
                                <p className="text-xs opacity-90">Your Safe Chat Assistant</p>
                            </div>
                        </div>
                        <button
                            onClick={handleToggleChat}
                            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                            aria-label="Close chat"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${msg.role === 'user'
                                        ? 'bg-purple-600 text-white rounded-tr-sm'
                                        : msg.crisis
                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100 border border-red-300 dark:border-red-700 rounded-tl-sm'
                                            : msg.error
                                                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100 border border-orange-300 dark:border-orange-700 rounded-tl-sm'
                                                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-tl-sm shadow-sm'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                        {msg.content}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 border border-gray-200 dark:border-gray-600 shadow-sm">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        <Loader size={16} className="animate-spin" />
                                        <span className="text-sm">Lina is thinking... (30-40s)</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                disabled={isLoading}
                                className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                maxLength={500}
                            />
                            <button
                                type="submit"
                                disabled={!inputMessage.trim() || isLoading}
                                className="p-2.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-purple-500/50"
                                aria-label="Send message"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Private &amp; confidential • May take 30-40 seconds
                            </p>
                            <span className={`text-xs font-medium tabular-nums ${inputMessage.length > 450
                                    ? inputMessage.length > 480
                                        ? 'text-red-500'
                                        : 'text-orange-500'
                                    : 'text-gray-400 dark:text-gray-500'
                                }`}>
                                {inputMessage.length}/500
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LinaAIChat;
