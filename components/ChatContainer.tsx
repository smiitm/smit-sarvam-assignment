"use client";

import React, { useState, useEffect, useRef } from "react";
import MessageContent from "./MessageContent";
import { ChatInput } from "./ChatInput";
import rawChatData from "@/data/chat2.json";
import PDFViewer from "./PDFViewer";

interface Block {
  type: "heading" | "paragraph" | "list" | "references";
  text?: string;
  items?: string[];
  sources?: { url: string; name: string }[];
}

interface UserMessage {
  type: "user";
  text: string;
}

interface BotMessage {
  type: "bot";
  content: Block[];
}

type Message = UserMessage | BotMessage;

interface ChatData {
  chats: {
    messages: Message[];
  }[];
}

const chatData = rawChatData as ChatData;

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>(
    chatData.chats[0].messages
  );
  const [showPDF, setShowPDF] = useState(false);

  // Ref to track the last message
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle sending messages
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: UserMessage = { type: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    const botResponse: BotMessage = {
      type: "bot",
      content: [
        { type: "paragraph", text: "Thank you for your question!" },
        { type: "paragraph", text: "Here is a sample response." },
      ],
    };
    setMessages((prev) => [...prev, botResponse]);
  };

  return (
    <div className="flex h-full items-center justify-center">
      {/* Chat part */}
      <div className={`flex flex-col h-full max-h-screen ${showPDF ? "w-1/2" : "w-3/5"} bg-color1 pt-6 pb-2 mx-10 transition-all duration-300 relative`}>
        {/* Gradient effect at the top */}
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-color1 to-transparent z-10 pointer-events-none" />
        <div className="flex-1 overflow-y-auto space-y-4 max-w-3xl scrollbar-hide relative py-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 max-w-fit text-color5 ${message.type === "user" ? "ml-auto bg-color3" : "mr-auto"}`}
            >
              {message.type === "user" ? (
                <div>{message.text}</div>
              ) : (
                <>
                  <button
                    onClick={() => setShowPDF(!showPDF)}
                    className="px-4 py-2 bg-color3 text-color5 rounded-md hover:bg-opacity-80"
                  >
                    {showPDF ? 'Hide PDF' : 'Show PDF'}
                  </button>
                  <MessageContent content={message.content} />
                </>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-transparent mt-auto">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      {/* PDF Viewer */}
      {showPDF && (
        <div className="w-1/2 h-full mr-2">
          <PDFViewer
            url="/sample1.pdf"
            title="Document.pdf"
            onClose={() => setShowPDF(false)}
            onDownload={() => console.log('Download clicked')}
          />
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
