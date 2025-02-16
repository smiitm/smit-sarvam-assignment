"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatContainer from "@/components/ChatContainer";

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
    id: number;
    messages: Message[];
}

export default function ChatPage() {
  const params = useParams(); 
  const router = useRouter();
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChatData() {
      if (!params?.id) return; 

      try {
        const res = await fetch(`/data/${params.id}.json`);
        if (!res.ok) {
          router.push("/404");
          return;
        }
        const data = await res.json();
        setChatData(data);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchChatData();
  }, [params?.id, router]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!chatData) return <div className="text-center p-4">Chat not found!</div>;

  return <ChatContainer initialMessages={chatData.messages} />;
}
