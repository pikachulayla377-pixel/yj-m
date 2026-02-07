"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
    const [inputValue, setInputValue] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const whatsappNumber = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "Not Available";
    // We'll use a generic email or assume one doesn't exist in env and provide a placeholder or instructions.
    // Since the user said "take from env", and I found no email env, I will use a placeholder that encourages checking the .env file or manually updating.
    // However, I can try to infer or use the brand name to construct one if needed, but safer to just state it's from env (even if missing).
    const supportEmail = process.env.GMAIL_USER || "support@yuji.com"; // Fallback to a generic one if env is missing, or maybe undefined.

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();
        setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
        setInputValue("");

        // Simple bot logic
        setTimeout(() => {
            let botReply = "";
            const lowerMsg = userMessage.toLowerCase();

            if (lowerMsg === "hi" || lowerMsg === "hello" || lowerMsg === "hey" || lowerMsg === "hola") {
                botReply = "Hello! How can I help you today?";
            } else {
                botReply = `You can reach our support team at:\n\n📧 Email: ${supportEmail}\n📱 WhatsApp: ${whatsappNumber}`;
            }

            setMessages((prev) => [...prev, { text: botReply, isUser: false }]);
        }, 600);
    };

    return (
        <div ref={containerRef} className="fixed bottom-6 left-6 z-[100] sm:bottom-8 sm:left-8 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute bottom-20 left-0 w-[300px] sm:w-[350px] h-[450px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[var(--accent)]/10 to-transparent p-4 border-b border-white/5 flex items-center gap-3 shrink-0">
                            <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/30">
                                <Bot size={18} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Support Assistant</h3>
                                <p className="text-xs text-white/50">Online • 24/7</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="ml-auto text-white/50 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.length === 0 && (
                                <div className="text-center text-white/40 text-sm mt-10">
                                    <p>Say "Hi" to start a conversation!</p>
                                </div>
                            )}
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${msg.isUser
                                            ? "bg-[var(--accent)] text-black rounded-tr-none font-medium"
                                            : "bg-white/10 text-white rounded-tl-none border border-white/5"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-3 bg-black/20 border-t border-white/5 shrink-0 flex gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--accent)]/50 focus:bg-white/10 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="w-10 h-10 rounded-xl bg-[var(--accent)] text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--accent)]/80 transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </form>

                        {/* Glossy overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`
          relative w-11 h-11 rounded-full 
          bg-[var(--accent)] 
          flex items-center justify-center text-black
          shadow-[0_0_15px_-5px_var(--accent)] 
          hover:shadow-[0_0_20px_-5px_var(--accent)]
          transition-shadow duration-300
          z-10 group
        `}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={20} className="text-black font-bold" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle size={20} className="text-black font-bold fill-current" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulse ring when closed */}
                {!isOpen && (
                    <span className="absolute -inset-1 rounded-full border border-[var(--accent)] opacity-40 animate-ping pointer-events-none" />
                )}
            </motion.button>
        </div>
    );
}
