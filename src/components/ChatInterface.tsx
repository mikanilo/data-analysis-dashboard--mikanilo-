
import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DataRow } from '@/types/data';

// 🔴 ADVANCED - Week 7-8: AI Integration Component
// TODO: Students - This is where you'll integrate OpenAI/Anthropic APIs
// Learning objectives:
// - API integration patterns
// - Async/await and Promise handling
// - Error handling for external services
// - Building conversational interfaces
// - Context management for AI conversations

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
  // 🟢 EASY - React State Management
  // TODO: Students - Week 5: Understand useState for managing chat state
  // Why do we need separate state for messages, input, and loading?
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 🔴 ADVANCED - Week 7-8: AI API Integration
  // TODO: Students - This is your main implementation task!
  // Replace the setTimeout with real AI API calls
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // 🟢 EASY - Message Creation
    // TODO: Students - Week 5: Understand object creation and state updates
    const userMessage: ChatMessage = {
      id: Date.now().toString(), // TODO: Use better ID generation (UUID)
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    // 🟡 MEDIUM - State Updates with Previous State
    // TODO: Students - Week 5: Why do we use prev => [...prev, userMessage]?
    // HINT: React state immutability principles
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // 🔴 ADVANCED - Week 7-8: REPLACE THIS SECTION WITH REAL AI INTEGRATION
    // TODO: Students - Implement actual AI API call here
    // 
    // Steps to implement:
    // 1. Choose AI provider (OpenAI, Anthropic, etc.)
    // 2. Set up API credentials (environment variables)
    // 3. Create API request with user message + data context
    // 4. Handle API response and errors
    // 5. Stream responses for better UX (optional)
    //
    // Example structure:
    // try {
    //   const response = await fetch('/api/ai-chat', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ 
    //       message: input, 
    //       dataContext: data.slice(0, 100) // Limit for token usage
    //     })
    //   });
    //   const aiResponse = await response.json();
    //   // Process and display AI response
    // } catch (error) {
    //   // Handle errors gracefully
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

    // TODO: Week 8 - Add conversation memory
    // HINT: Send previous messages as context to maintain conversation flow
    
    // TODO: Week 8 - Add data-aware responses
    // HINT: Include relevant data samples in the AI prompt for context
  };

  // 🟡 MEDIUM - Advanced User Experience
  // TODO: Students - Week 5-6: Enhance the chat interface
  // Current features: basic messaging
  // Add: message reactions, typing indicators, message editing, conversation export

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Data Assistant
          {/* TODO: Week 7 - Add AI model indicator */}
        </CardTitle>
        <p className="text-sm text-gray-600">
          Ask questions about your data or get help understanding insights
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* 🟡 MEDIUM - Messages Display Area */}
        {/* TODO: Students - Week 5: Understand scrollable containers and flex layouts */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
          {messages.length === 0 ? (
            // 🟢 EASY - Empty State Design
            // TODO: Students - Week 3: Create engaging empty states
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation about your data!</p>
              <p className="text-sm mt-2">Try asking: "What patterns do you see?" or "Explain this chart"</p>
              {/* TODO: Add sample questions based on data type */}
            </div>
          ) : (
            // 🟡 MEDIUM - Message Rendering
            // TODO: Students - Week 5: Understand array mapping and conditional styling
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
                  {/* TODO: Week 6 - Add message actions (copy, edit, delete) */}
                </div>
              </div>
            ))
          )}
          
          {/* 🟢 EASY - Loading State */}
          {/* TODO: Students - Week 5: Create better loading animations */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                <p className="text-sm">Thinking...</p>
                {/* TODO: Add animated typing indicator */}
              </div>
            </div>
          )}
        </div>

        {/* 🟡 MEDIUM - Input Area */}
        {/* TODO: Students - Week 5: Understand form handling and keyboard events */}
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your data..."
            className="flex-1 min-h-[60px] resize-none"
            onKeyDown={(e) => {
              // TODO: Week 5 - Why do we check for shiftKey?
              // HINT: Allow Shift+Enter for new lines, Enter to send
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
        
        {/* TODO: Week 6 - Add input enhancements */}
        {/* Ideas: character count, auto-resize, voice input, attachment support */}
      </CardContent>
    </Card>
  );
};

export default ChatInterface;

// 🔴 ADVANCED - Week 8-9: Advanced Features to Implement
// TODO: Students - Choose from these advanced features:
// 
// 1. Conversation Context Management
//    - Store conversation history
//    - Implement conversation summarization
//    - Add conversation branching
// 
// 2. AI Response Enhancement
//    - Streaming responses (real-time typing)
//    - Response regeneration
//    - Multiple AI model support
// 
// 3. Data Integration Features
//    - Chart generation from chat
//    - Data filtering through conversation
//    - Export insights to reports
// 
// 4. User Experience Improvements
//    - Dark/light mode support
//    - Conversation export/import
//    - Keyboard shortcuts
//    - Mobile-responsive design
