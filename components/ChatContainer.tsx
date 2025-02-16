"use client";

import React, { useState, useEffect, useRef } from "react";
import MessageContent from "./MessageContent";
import { ChatInput } from "./ChatInput";
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

interface ChatContainerProps {
  initialMessages: Message[];
}

export function ChatContainer({ initialMessages }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Instead of showPDF, we track a selected PDF URL
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMessage: UserMessage = { type: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    const botResponse: BotMessage = {
      type: "bot",
      content: [
        { type: "paragraph", text: "Thank you for your question!" },
        { type: "paragraph", text: "Here is a sample response." },
      ],
    };
    setMessages((prev) => [...prev, botResponse]);
  };

  // Opens PDF specified by the source URL
  const handleSourceClick = (url: string) => {
    setPdfUrl(url);
  };

  return (
    <div className="flex items-center justify-center text-xs md:text-sm lg:text-base w-full px-4 lg:px-2">
      <div className="flex flex-col max-h-screen md:w-3/5 w-full bg-color1 pt-6 pb-2 transition-all duration-300 relative items-center justify-between mx-8">
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-color1 to-transparent z-10 pointer-events-none" />
        <div className="flex-1 overflow-y-auto space-y-2 max-w-3xl relative py-2 w-full scrollbar-hide">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`rounded-lg max-w-fit text-color5 ${
                message.type === "user" ? "ml-auto bg-color3" : "mr-auto"
              }`}
            >
              {message.type === "user" ? (
                <div className="px-4 py-2">{message.text}</div>
              ) : (
                // Pass handleSourceClick + activePdfUrl
                <MessageContent
                  content={message.content}
                  onSourceClick={handleSourceClick}
                  activePdfUrl={pdfUrl}
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
  
        <div className="bg-transparent mt-auto w-full">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
  
      {/* Render PDFViewer if pdfUrl is set */}
      {pdfUrl && (
        <div className="w-1/2 h-full mr-2">
          <PDFViewer
            url={pdfUrl}
            title="Document.pdf"
            onClose={() => setPdfUrl(null)}
            onDownload={() => console.log('Download clicked')}
          />
        </div>
      )}
    </div>
  );
}

export default ChatContainer;