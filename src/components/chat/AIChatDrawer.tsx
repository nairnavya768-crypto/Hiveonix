import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AIService } from '../../services/aiService';
import { ChatMessage } from '../../types';
import { Sparkles, MessageSquare, Send, X, Bot, User, CheckCircle2 } from 'lucide-react';

export const AIChatDrawer: React.FC = () => {
  const { isChatbotOpen, setIsChatbotOpen, currentUser } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello ${currentUser.name}! I am your Hiveonix AI Beekeeping & Quality Assistant. I can analyze hive sensor telemetry, diagnose disease symptoms, guide honey harvest timing, or explain NABL lab standards. How may I assist your apiary today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatbotOpen) {
      scrollToBottom();
    }
  }, [messages, isChatbotOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    const botResponse = await AIService.generateChatbotResponse(text, currentUser.role, newHistory);

    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  const quickQuestions = [
    'How do I treat Varroa mites organically?',
    'What is optimal hive internal temperature?',
    'Explain C4 sugar adulteration testing',
    'How does Madhukranti SSO work?',
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      {!isChatbotOpen && (
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold shadow-xl border border-[#D9A441] flex items-center gap-2.5 transition-all hover:scale-105"
        >
          <div className="w-6 h-6 rounded-full bg-[#FFF8E6] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
          </div>
          <span>AI Bee Advisor</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </button>
      )}

      {/* Slide-in Chat Window */}
      {isChatbotOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md h-[560px] bg-white rounded-3xl border border-[#E8E2D2] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#FAF3DF] via-[#FFF9E8] to-[#FCFBF7] border-b border-[#EAE2CA] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F6E7A1] border border-[#D9A441]/50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#8C6B1F]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#20221F] font-heading">
                  Hiveonix AI Intelligence
                </h3>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Apicultural Gemini Model Active
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsChatbotOpen(false)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-[#FCFBF7] border-b border-[#F0EAD9] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#D9D3C3] text-[10px] font-semibold text-[#555] hover:text-[#20221F] hover:border-[#D9A441] whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3.5 bg-stone-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-[#FFF8E6] border border-[#F6E7A1] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-[#8C6B1F]" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                    msg.sender === 'user'
                      ? 'bg-[#20221F] text-white rounded-tr-xs'
                      : 'bg-white border border-[#E8E2D2] text-[#20221F] rounded-tl-xs shadow-2xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[9px] block text-right font-mono ${
                      msg.sender === 'user' ? 'text-stone-400' : 'text-stone-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-[#20221F] text-[#F6E7A1] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-stone-400 text-xs pl-9">
                <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-bounce delay-200" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#EAE4D4] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about hive health, harvest, or lab rules..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-[#D9D3C3] text-xs focus:border-[#D9A441] bg-[#FCFBF7]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white disabled:opacity-40 transition-all shadow-xs"
            >
              <Send className="w-4 h-4 text-[#F6E7A1]" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
