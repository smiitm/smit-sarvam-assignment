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
  const [showPDF, setShowPDF] = useState(false);

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

  return (
    <div className="flex items-center justify-center text-xs md:text-sm lg:text-base w-full px-4 lg:px-2 ">
      <div className={`flex flex-col max-h-screen ${showPDF ? "md:w-1/2" : "md:w-3/5"} w-full bg-color1 pt-6 pb-2  transition-all duration-300 relative items-center justify-between mx-8`}>
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-color1 to-transparent z-10 pointer-events-none" />
        <div className="flex-1 overflow-y-auto space-y-4 max-w-3xl relative py-2 w-full scrollbar-hide">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`rounded-lg max-w-fit text-color5 ${message.type === "user" ? "ml-auto bg-color3" : "mr-auto"}`}
            >
              {message.type === "user" ? (
                <div className="px-4 py-2">{message.text}</div>
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

        <div className="bg-transparent mt-auto w-full">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>

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
