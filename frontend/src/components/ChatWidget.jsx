import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Copy, Check } from 'lucide-react';
import { aiAPI } from '../services/api';

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const [copied, setCopied] = useState(false);
    const messagesEndRef = useRef(null);

    // Load conversation from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('ai_chat_history');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                setMessages(data.messages || []);
                setConversationId(data.conversationId);
            } catch (error) {
                console.error('Error loading chat history:', error);
                initializeWelcomeMessage();
            }
        } else {
            initializeWelcomeMessage();
        }
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const initializeWelcomeMessage = () => {
        const welcomeMessage = {
            role: 'assistant',
            content: "Hi! 👋 I'm **Lina**, your AI Safe Chat assistant.\n\nI'm here to answer your questions about sexual and reproductive health. My meaningful responses take about **30-40 seconds** to generate because I carefully analyze your question to provide accurate, culturally sensitive, and safe advice.\n\nEverything you share is **secure, private, and confidential**.\n\nHow can I help you today?",
            timestamp: new Date()
        };
        setMessages([welcomeMessage]);
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = {
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await aiAPI.chat({
                message: input,
                conversationId,
                history: messages.slice(-6) // Send last 6 messages for context
            });

            const aiMessage = {
                role: 'assistant',
                content: response.data.response,
                timestamp: new Date(),
                escalated: response.data.escalated,
                crisis: response.data.crisis
            };

            const updatedMessages = [...newMessages, aiMessage];
            setMessages(updatedMessages);

            if (response.data.conversationId) {
                setConversationId(response.data.conversationId);

                // Save to localStorage
                localStorage.setItem('ai_chat_history', JSON.stringify({
                    messages: updatedMessages,
                    conversationId: response.data.conversationId
                }));
            }

        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                role: 'assistant',
                content: error.response?.data?.response || "I'm having trouble responding. Please try again or contact our support team at info@wekume.org.",
                timestamp: new Date(),
                error: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleNewConversation = () => {
        localStorage.removeItem('ai_chat_history');
        setConversationId(null);
        initializeWelcomeMessage();
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Quick action buttons
    const quickActions = [
        { label: '📚 SRH Information', message: 'Tell me about sexual reproductive health services' },
        { label: '💚 Mental Health', message: 'I need mental health support' },
        { label: '📍 Find Us', message: 'Where are your offices located?' },
        { label: '🤝 Get Involved', message: 'How can I join your programs?' }
    ];

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-all hover:scale-110 z-50 animate-pulse"
                aria-label="Open chat assistant"
            >
                <MessageCircle size={28} />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in">
            {/* Header */}
            <div className="gradient-primary text-white p-4 rounded-t-2xl flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <MessageCircle size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold">Lina - AI Safe Chat</h3>
                        <p className="text-xs opacity-90">Powered by AI</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-white/20 p-2 rounded-full transition-colors"
                    aria-label="Close chat"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Quick Actions (only show if no messages yet or just welcome message) */}
            {messages.length <= 1 && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">Quick actions:</p>
                    <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action, idx) => (
                            <button
                                key={idx}
                                onClick={() => setInput(action.message)}
                                className="text-xs bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg p-2 hover:bg-primary-50 dark:hover:bg-gray-500 hover:border-primary-300 transition-colors text-left dark:text-gray-200"
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[85%] group relative`}>
                            <div className={`p-3 rounded-lg ${msg.role === 'user'
                                ? 'bg-primary-600 text-white rounded-br-none'
                                : msg.crisis
                                    ? 'bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 text-gray-900 dark:text-white rounded-bl-none'
                                    : msg.error
                                        ? 'bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 text-gray-900 dark:text-white rounded-bl-none'
                                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-bl-none shadow-sm'
                                }`}>
                                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>

                                {msg.escalated && (
                                    <div className="mt-3 pt-3 border-t border-red-200">
                                        <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
                                            🆘 Connected to human support team
                                        </p>
                                    </div>
                                )}

                                <p className="text-xs opacity-60 mt-2">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>

                            {msg.role === 'assistant' && !msg.error && (
                                <button
                                    onClick={() => copyToClipboard(msg.content)}
                                    className="absolute -right-8 top-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200 rounded"
                                    title="Copy message"
                                >
                                    {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-gray-600" />}
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm">
                            <div className="flex gap-2 items-center">
                                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Lina is thinking... (approx. 30-40s)</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl">
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        disabled={loading}
                        maxLength={500}
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
                        aria-label="Send message"
                    >
                        <Send size={20} />
                    </button>
                </div>

                {messages.length > 1 && (
                    <button
                        onClick={handleNewConversation}
                        className="text-xs text-gray-500 hover:text-primary-600 transition-colors"
                    >
                        ↻ Start new conversation
                    </button>
                )}

                <p className="text-xs text-gray-400 mt-2 text-center">
                    AI-powered • For emergencies: +256 XXX XXX XXX
                </p>
            </div>
        </div>
    );
}

export default ChatWidget;
