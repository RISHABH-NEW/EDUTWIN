import { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  BookOpen,
  Lightbulb,
  HelpCircle,
  Globe,
  MessageSquare,
} from 'lucide-react';

import aiService from "../services/aiService";
import { studentProfile } from "../data/mockData";

const quickActions = [
  { label: 'Explain Simply', icon: Lightbulb, mode: 'simple' },
  { label: 'Give Example', icon: BookOpen, mode: 'example' },
  { label: 'Quiz Me', icon: HelpCircle, mode: 'quiz' },
  { label: 'Explain in Hindi', icon: Globe, mode: 'hindi' },
  { label: 'Explain in Hinglish', icon: MessageSquare, mode: 'hinglish' },
];

const suggestedTopics = [
  'Explain recursion',
  'How does binary search work?',
  'What is dynamic programming?',
  'Explain sorting algorithms',
  'Help me with my weak areas',
];

function ChatMessage({ message, isUser }) {
  return (
    <div
      className={`flex gap-3 ${
        isUser ? 'flex-row-reverse' : ''
      }`}
    >
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
          isUser
            ? 'bg-primary-100 dark:bg-primary-950/80 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/50'
            : 'bg-gradient-to-br from-primary-500 to-accent-500 text-white'
        }`}
      >
        {isUser ? (
          <span className="text-xs font-bold">PS</span>
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      <div className={`max-w-[80%] ${isUser ? 'text-right' : ''}`}>
        <div
          className={`inline-block p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'bg-primary-600 text-white rounded-tr-md'
              : 'bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 rounded-tl-md shadow-sm'
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-sm">
        <Bot className="w-4 h-4 text-white" />
      </div>

      <div className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center">
          <div className="w-2 h-2 bg-surface-400 dark:bg-surface-500 rounded-full animate-bounce" />
          <div
            className="w-2 h-2 bg-surface-400 dark:bg-surface-500 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-2 h-2 bg-surface-400 dark:bg-surface-500 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AITutor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text:
        "Hello! 👋 I'm your EduTwin AI Tutor.\n\n" +
        "I can help you with:\n\n" +
        "• Explaining concepts in any subject\n" +
        "• Solving problems step by step\n" +
        "• Quizzing you on topics\n" +
        "• Study planning and recommendations\n\n" +
        "What would you like to learn today?",
      isUser: false,
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastTopic, setLastTopic] = useState('');

  const messagesEndRef = useRef(null);

  const student = studentProfile;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    if (!text || !text.trim() || isTyping) {
      return;
    }

    const cleanText = text.trim();

    const userMessage = {
      id: Date.now(),
      text: cleanText,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLastTopic(cleanText);
    setIsTyping(true);

    try {
      const response = await aiService.chat(
        cleanText,
        messages,
        student
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text:
            response ||
            'Sorry, I could not generate a response.',
          isUser: false,
        },
      ]);
    } catch (error) {
      console.error('AI Tutor Error:', error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text:
            'Sorry, I encountered an error while connecting to the AI. Please try again.',
          isUser: false,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = async (mode) => {
    if (isTyping) {
      return;
    }

    const topic = lastTopic || 'this topic';

    const actionLabels = {
      simple: `Explain "${topic}" simply`,
      example: `Give me an example of "${topic}"`,
      quiz: `Quiz me on "${topic}". Ask me one question at a time.`,
      hindi: `Explain "${topic}" in Hindi`,
      hinglish: `Explain "${topic}" in Hinglish`,
    };

    const actionText = actionLabels[mode];

    const userMessage = {
      id: Date.now(),
      text: actionText,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLastTopic(actionText);
    setIsTyping(true);

    try {
      const response = await aiService.chat(
        actionText,
        messages,
        student
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text:
            response ||
            'Sorry, I could not generate a response.',
          isUser: false,
        },
      ]);
    } catch (error) {
      console.error('Quick Action Error:', error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text:
            'Sorry, I encountered an error while connecting to the AI. Please try again.',
          isUser: false,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-sm">
          <Bot className="w-5 h-5 text-white" />
        </div>

        <div>
          <h1 className="text-lg font-bold text-surface-900 dark:text-surface-100">
            AI Tutor
          </h1>

          <p className="text-xs text-surface-400 dark:text-surface-500">
            Powered by EduTwin AI · Always here to help
          </p>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

          <span className="text-xs text-surface-400 dark:text-surface-500">
            Online
          </span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-surface-50/50 dark:bg-surface-900/60 rounded-2xl border border-surface-200/60 dark:border-surface-800 p-4 space-y-4 mb-4 transition-colors duration-200">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.text}
            isUser={msg.isUser}
          />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />

        {messages.length === 1 && (
          <div className="mt-4">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-2">
              Try asking:
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => sendMessage(topic)}
                  disabled={isTyping}
                  className="px-3 py-1.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-full text-xs text-surface-600 dark:text-surface-300 hover:bg-primary-50 dark:hover:bg-primary-950/60 hover:border-primary-200 dark:hover:border-primary-800 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-200 disabled:opacity-50 shadow-sm"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1 -mx-1 px-1">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action.mode)}
              disabled={isTyping}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-full text-xs font-medium text-surface-600 dark:text-surface-300 whitespace-nowrap hover:bg-primary-50 dark:hover:bg-primary-950/60 hover:border-primary-200 dark:hover:border-primary-800 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-200 disabled:opacity-50 shadow-sm"
            >
              <Icon className="w-3 h-3" />
              {action.label}
            </button>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI tutor anything..."
            rows={1}
            disabled={isTyping}
            className="input-field resize-none py-3 pr-12 disabled:opacity-60"
            style={{
              minHeight: '44px',
              maxHeight: '120px',
            }}
          />
        </div>

        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          className="btn-primary p-3 rounded-xl disabled:opacity-40 flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}