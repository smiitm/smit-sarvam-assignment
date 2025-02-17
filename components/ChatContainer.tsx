"use client";

import React, { useState, useEffect, useRef } from "react";
import { Drawer } from "vaul";
import MessageContent from "./MessageContent";
import { ChatInput } from "./ChatInput";
import PDFViewer from "./PDFViewer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 1024;
      setIsMobile(newIsMobile);

      // Handle transitions between mobile/desktop
      if (!newIsMobile && drawerOpen) {
        setDrawerOpen(false);
      }
      if (newIsMobile && pdfUrl) {
        setDrawerOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawerOpen, pdfUrl]);

  const handleSourceClick = (url: string) => {
    setPdfUrl(url);
    if (isMobile) {
      setDrawerOpen(true);
    }
  };
  const handleSendMessage = (message: string): void => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: message }
    ]);

    // Simulate bot response (replace with actual API call)
    const botResponse: BotMessage = {
      type: "bot",
      content: [
        {
          type: "paragraph",
          text: "This is a simulated response. Replace with actual API integration."
        }
      ]
    };

    // Add bot message after a short delay to simulate processing
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      // Scroll to bottom after new message
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  return (
    <div className="flex items-center justify-center text-xs md:text-sm lg:text-base w-full px-4 lg:px-2">
      <div className="flex flex-col max-h-screen md:w-3/5 w-full bg-color1 pt-6 pb-2 transition-all duration-300 relative items-center justify-between mx-8">
        <div className="hidden lg:block absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-color1 to-transparent z-10 pointer-events-none" />
        <div className="flex-1 overflow-y-auto space-y-2 max-w-3xl relative py-2 w-full scrollbar-hide">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`rounded-lg max-w-fit text-color5 ${message.type === "user" ? "ml-auto bg-color3" : "mr-auto"
                }`}
            >
              {message.type === "user" ? (
                <div className="px-4 py-2">{message.text}</div>
              ) : (
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

      {pdfUrl && !isMobile && (
        <div className="w-1/2 h-full mr-2">
          <PDFViewer
            url={pdfUrl}
            title="Document.pdf"
            onClose={() => setPdfUrl(null)}
            onDownload={() => console.log("Download clicked")}
          />
        </div>
      )}

      {/* Mobile PDF Drawer */}
      {isMobile && (
        <Drawer.Root
          open={drawerOpen}
          onOpenChange={(open) => {
            if (!open) {
              setPdfUrl(null);
              setDrawerOpen(false);
            }
          }}
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 h-[90%] mt-24 rounded-t-[10px] bg-color1 flex flex-col">
              <VisuallyHidden>
                <DialogTitle>PDF Viewer</DialogTitle>
              </VisuallyHidden>
              <Drawer.Handle className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-color4 mb-8 mt-4" />
              {pdfUrl && (
                <div className="flex-1 overflow-hidden px-2 pb-2">
                  <PDFViewer
                    url={pdfUrl}
                    title="Document.pdf"
                    onClose={() => {
                      setPdfUrl(null);
                      setDrawerOpen(false);
                    }}
                    onDownload={() => console.log("Download clicked")}
                  />
                </div>
              )}
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </div>
  );
}

export default ChatContainer;