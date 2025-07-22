
import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DataRow } from '@/types/data';

// 🤖 Week 7-8: AI Integration - Building Intelligent Conversations
// Students - This is where your dashboard becomes truly intelligent! You're building the future of data analysis.
// 
// Journey milestone: You've mastered React fundamentals (Weeks 1-6), now add cutting-edge AI capabilities!
// 
// Learning objectives:
// - Master API integration patterns with real-world AI services
// - Handle async operations and error states professionally
// - Build conversational interfaces that users love
// - Manage context and memory in AI conversations

interface ChatInterfaceProps {
  data: DataRow[];
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatInterface = ({ data }: ChatInterfaceProps) => {
  // 🔧 Week 5: React State Mastery - Building Interactive UIs
  // Students - Learn why we need separate state for different UI concerns
  // Professional tip: Well-organized state makes complex UIs manageable!
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 🚀 Week 7-8: YOUR MAIN CHALLENGE - Real AI Integration!
  // Students - Replace this placeholder with actual AI API calls
  // This is where your app transforms from demo to production-ready tool!
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // 🎯 Week 5: Professional Object Creation Patterns
    // Students - Master immutable state updates and object creation
    // Why do we create new objects instead of modifying existing ones?
    const userMessage: ChatMessage = {
      id: Date.now().toString(), // Week 6 improvement: Use proper UUID generation
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    // 🔄 Week 5: React Immutability Principles - Critical for Reliable Apps
    // Students - Why do we use prev => [...prev, userMessage]?
    // Answer: React requires immutable updates for state changes to trigger re-renders!
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // 🚀 Week 7-8: REPLACE THIS ENTIRE SECTION WITH REAL AI INTEGRATION
    // Students - Your mission: Implement actual AI API calls here!
    // 
    // Implementation roadmap:
    // 1. Choose your AI provider (OpenAI, Anthropic, Google AI, etc.)
    // 2. Set up API credentials securely (environment variables)
    // 3. Create API requests with user message + data context
    // 4. Handle API responses and error states gracefully
    // 5. Optional: Add streaming responses for premium user experience
    //
    // Example implementation pattern:
    // try {
    //   const response = await fetch('/api/ai-chat', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ 
    //       message: input, 
    //       dataContext: data.slice(0, 100) // Smart context limiting
    //     })
    //   });
    //   const aiResponse = await response.json();
    //   // Process and display AI response professionally
    // } catch (error) {
    //   // Handle errors gracefully with user-friendly messages
    // }
    
    // PLACEHOLDER IMPLEMENTATION - REMOVE WHEN IMPLEMENTING REAL AI
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I see you're asking about the data. Currently, your dataset has ${data.length} rows. This is where students will integrate AI to provide real insights!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);

    // Week 8-9: Add conversation memory for contextual responses
    // Professional tip: AI remembers previous context for natural conversations
    
    // Week 8-9: Make AI responses data-aware and insightful
    // Include relevant data samples in prompts for contextual intelligence
  };

  // 🎨 Week 5-6: Advanced User Experience Design
  // Students - Transform basic messaging into professional chat interfaces
  // Current: Core messaging works perfectly! 
  // Week 6-7 enhancements: Add reactions, typing indicators, message editing, conversation export

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Data Assistant
          {/* Week 7-8: Add AI model indicator and settings */}
        </CardTitle>
        <p className="text-sm text-gray-600">
          Ask questions about your data or get help understanding insights
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* 📱 Week 5: Professional Layout Design - Responsive and Accessible */}
        {/* Students - Master flexible layouts that work on any device */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
          {messages.length === 0 ? (
            // 🎯 Week 3-4: Engaging Empty States - Guide Users to Success
            // Students - Create empty states that inspire action, not confusion
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation about your data!</p>
              <p className="text-sm mt-2">Try asking: "What patterns do you see?" or "Explain this chart"</p>
              {/* Week 5: Add smart sample questions based on actual data type */}
            </div>
          ) : (
            // 🎨 Week 5: Dynamic Message Rendering - Professional Chat UI
            // Students - Learn array mapping and conditional styling for interactive interfaces
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                  {/* Week 6-7: Add message actions (copy, edit, delete, reactions) */}
                </div>
              </div>
            ))
          )}
          
          {/* 💫 Week 5: Professional Loading States */}
          {/* Students - Create engaging loading animations that keep users interested */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                <p className="text-sm">Thinking...</p>
                {/* Week 6: Add animated typing indicator and response preview */}
              </div>
            </div>
          )}
        </div>

        {/* ⌨️ Week 5: Advanced Form Handling - Professional Input Experience */}
        {/* Students - Master form handling and keyboard events for smooth user interactions */}
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your data..."
            className="flex-1 min-h-[60px] resize-none"
            onKeyDown={(e) => {
              // Week 5: Why check shiftKey? Allows Shift+Enter for new lines, Enter to send!
              // Professional UX pattern used in Slack, Discord, and other chat apps
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isLoading}
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Week 6-7: Professional Input Enhancements */}
        {/* Ideas: character count, auto-resize, voice input, file attachments */}
      </CardContent>
    </Card>
  );
};

export default ChatInterface;

// 🚀 Week 8-10: Advanced AI Features - Production-Level Intelligence
// Students - Choose your advanced features to implement:
// 
// Week 8: Core AI Enhancements
// • Conversation context management and memory
// • AI response streaming for real-time typing effects
// • Multiple AI model support and switching
// 
// Week 9: Smart Data Integration
// • Chart generation directly from chat conversations
// • Data filtering and analysis through natural language
// • Export insights and conversations to reports
// 
// Week 10: Professional Polish
// • Dark/light mode support throughout
// • Conversation import/export functionality
// • Keyboard shortcuts and accessibility features
// • Mobile-responsive chat experience
