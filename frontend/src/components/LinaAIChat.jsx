import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Loader, Minimize2, Maximize2, Trash2 } from 'lucide-react';
import { aiAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

function LinaAIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
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
    }, [messages, isOpen, isMinimized]);

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, isMinimized]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await aiAPI.chat({
                message: userMessage,
                conversationId,
                history: messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                }))
            });

            const { response: aiResponse, conversationId: newConvId, crisis, escalated } = response.data;

            if (newConvId && !conversationId) {
                setConversationId(newConvId);
            }

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
        setIsMinimized(false);
    };

    const handleClearChat = () => {
        if (window.confirm("Are you sure you want to clear the chat history?")) {
            setMessages([{
                role: 'assistant',
                content: 'Chat cleared. How can I help you now?'
            }]);
            setConversationId(null);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? 'auto' : '600px',
                            transition: { type: "spring", stiffness: 300, damping: 30 }
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[90vw] sm:w-[400px] max-h-[80vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 pointer-events-auto origin-bottom-right`}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between text-white shadow-md relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-white/20 rounded-full p-1 flex items-center justify-center overflow-hidden border border-white/30 backdrop-blur-sm">
                                        {/* Attempt to use CSS to improve logo appearance since generation failed */}
                                        <img
                                            src="/assets/lina-logo.jpg"
                                            alt="Lina AI"
                                            className="w-full h-full object-cover scale-110"
                                        />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-purple-600 rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">Lina AI</h3>
                                    <p className="text-xs text-blue-100 font-medium">Safe & Confidential</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                                    aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                                >
                                    {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                                </button>
                                <button
                                    onClick={handleClearChat}
                                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                                    aria-label="Clear chat"
                                    title="Clear History"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button
                                    onClick={handleToggleChat}
                                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                                    aria-label="Close chat"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Content (Hidden when minimized) */}
                        {!isMinimized && (
                            <>
                                {/* Messages Container */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50 scroll-smooth">
                                    {messages.map((msg, index) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            key={index}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {msg.role === 'assistant' && (
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0 mr-2 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                                    AI
                                                </div>
                                            )}
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${msg.role === 'user'
                                                    ? 'bg-purple-600 text-white rounded-tr-sm'
                                                    : msg.crisis
                                                        ? 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100 border border-red-200 dark:border-red-800 rounded-tl-sm'
                                                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-tl-sm'
                                                    }`}
                                            >
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                                    {msg.content}
                                                </p>
                                                {msg.role === 'assistant' && (
                                                    <p className="text-[10px] mt-1 opacity-50 text-right">
                                                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Loading Indicator */}
                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex justify-start"
                                        >
                                            <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3">
                                                <div className="flex gap-1">
                                                    <motion.span
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                                        className="w-1.5 h-1.5 bg-purple-500 rounded-full"
                                                    />
                                                    <motion.span
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                                        className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                                                    />
                                                    <motion.span
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                                        className="w-1.5 h-1.5 bg-purple-500 rounded-full"
                                                    />
                                                </div>
                                                <span className="text-xs text-gray-400">Lina is typing...</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                                    <form onSubmit={handleSendMessage} className="relative flex items-end gap-2">
                                        <textarea
                                            ref={inputRef}
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage(e);
                                                }
                                            }}
                                            placeholder="Ask anything..."
                                            disabled={isLoading}
                                            rows={1}
                                            className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none text-sm max-h-32 min-h-[44px]"
                                            style={{ height: 'auto', minHeight: '44px' }}
                                        />
                                        <button
                                            type="submit"
                                            disabled={!inputMessage.trim() || isLoading}
                                            className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex-shrink-0"
                                            aria-label="Send message"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </form>
                                    <div className="flex items-center justify-between mt-2 px-1">
                                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                            <Minimize2 size={10} />
                                            <span>Private & Confidential</span>
                                        </div>
                                        <span className={`text-[10px] font-medium ${inputMessage.length > 450 ? 'text-red-500' : 'text-gray-400'}`}>
                                            {inputMessage.length}/500
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                onClick={handleToggleChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative pointer-events-auto outline-none"
                aria-label={isOpen ? "Close Lina AI Chat" : "Open Lina AI Chat"}
            >
                {/* Ping Animation */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                    </span>
                )}

                <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'bg-gray-800' : 'bg-white'} overflow-hidden border-4 border-white dark:border-gray-700`}>
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-50 dark:from-purple-900/50 dark:to-blue-900/50"></div>

                    {/* Logo/Icon */}
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                        {isOpen ? (
                            <X size={32} className="text-white bg-red-500 rounded-full p-1" /> // Close icon when open
                        ) : (
                            <img
                                src="/assets/lina-logo.jpg"
                                alt="Lina"
                                className="w-full h-full object-cover rounded-full filter drop-shadow-sm hover:rotate-3 transition-transform duration-300"
                            />
                        )}
                    </div>
                </div>

                {/* Tooltip */}
                {!isOpen && (
                    <div className="absolute bottom-full right-0 mb-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-gray-900 text-white text-sm py-2 px-4 rounded-xl shadow-xl border border-gray-700 relative">
                            Chat with Lina (AI)
                            <div className="absolute -bottom-1 right-8 w-3 h-3 bg-gray-900 transform rotate-45 border-r border-b border-gray-700"></div>
                        </div>
                    </div>
                )}
            </motion.button>
        </div>
    );
}

export default LinaAIChat;
