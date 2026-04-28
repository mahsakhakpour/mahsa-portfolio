"use client";

import { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ user: string; bot?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          conversationId: conversationId 
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }

      setMessages(prev => [...prev, { user: userMessage, bot: data.reply }]);
      
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        user: userMessage, 
        bot: "Sorry, I'm having trouble connecting right now. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setConversationId(null);
  };

  const suggestedQuestions = [
    "What are Mahsa's main skills?",
    "Tell me about Mahsa's experience",
    "How can I contact Mahsa?",
    "What projects has Mahsa worked on?"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="chat-floating-button"
        aria-label="Open chat"
      >
        <FaComments size={24} />
        {messages.length > 0 && (
          <span className="chat-badge">{messages.length}</span>
        )}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="chat-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="chat-modal-header">
              <div className="chat-modal-title">
                <FaComments size={20} />
                <h3>Chat with Mahsa</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="chat-modal-close"
                aria-label="Close chat"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="chat-messages">
              {messages.length === 0 && (
                <div className="chat-welcome">
                  <div className="chat-welcome-icon"></div>
                  <h3>Hi! I&apos;m Mahsa&apos;s AI assistant</h3>
                  <p>Ask me anything about her skills, projects, or experience!</p>
                  <div className="suggested-questions">
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        className="suggested-btn"
                        onClick={() => {
                          setInput(q);
                          setTimeout(() => sendMessage(), 100);
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i}>
                  <div className="message-user">
                    <div className="message-user-content">{m.user}</div>
                  </div>
                  {m.bot && (
                    <div className="message-bot">
                      <div className="message-bot-content">{m.bot}</div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="message-bot">
                  <div className="message-bot-content thinking">
                    <span className="thinking-dots">Thinking</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="chat-input-area">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={isLoading}
                placeholder="Ask me about Mahsa..."
                className="chat-input"
              />
              <button 
                onClick={sendMessage} 
                disabled={isLoading}
                className="chat-send-btn"
              >
                {isLoading ? "..." : "Send"}
              </button>
              <button 
                onClick={clearConversation}
                disabled={isLoading || messages.length === 0}
                className="chat-clear-btn"
                title="Clear conversation"
              >
                ↺
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}