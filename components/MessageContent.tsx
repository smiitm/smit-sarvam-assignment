"use client";
import { Book, ThumbsUp, ThumbsDown, Copy, Download, Eye, Search, Repeat } from "lucide-react";

interface Source {
  url: string;
  name: string;
}

interface Block {
  type: "heading" | "paragraph" | "list" | "references";
  text?: string;
  items?: (string | { text: string; reference?: string })[];
  sources?: Source[];
}

interface MessageContentProps {
  content: Block[];
  // New callback to open PDF in ChatContainer
  onSourceClick?: (url: string) => void;
  activePdfUrl?: string | null;
}

function MessageContent({ content, onSourceClick, activePdfUrl }: MessageContentProps) {
  return (
    <div className="relative">
      {content.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return <div key={index} className="text-sm md:text-lg font-bold my-2">{block.text}</div>;

          case 'paragraph':
            return (
              <p key={index} className="my-2">
                {block.text}{' '}
                {block.sources?.map((source, idx) => (
                  <span key={idx} className="bg-color2 px-2 py-1 text-xs md:text-sm rounded-full ml-1">
                    {source.name}
                  </span>
                ))}
              </p>
            );

          case 'list':
            return (
              <ul key={index} className="list-disc pl-5 mb-2">
                {block.items?.map((item, idx) =>
                  typeof item === 'string' ? (
                    <li key={idx} className="py-1">{item}</li>
                  ) : (
                    <li key={idx} className="py-1">
                      {item.text}{' '}
                      {item.reference && (
                        <div className="inline-block bg-color2 px-1 md:px-2 md:py-1 text-xs rounded-full">
                          {item.reference}
                        </div>
                      )}
                    </li>
                  )
                )}
              </ul>
            );

            case "references":
            return (
              <div key={index} className="my-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    <h4 className="text-base lg:text-xl font-semibold">Sources</h4>
                  </div>
                </div>
                <div className="flex gap-2 overflow-x-auto overflow-hidden scrollbar-hide">
                  {block.sources?.map((source, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSourceClick?.(source.url)}
                      className={`flex gap-2 px-4 py-3 rounded-lg text-xs md:text-sm w-64 font-medium cursor-pointer
                        ${
                          activePdfUrl === source.url
                            ? "border-2 border-color4 bg-color2"
                            : "bg-color2 border-2 border-transparent"
                        }
                      `}
                    >
                      {source.name}
                    </div>
                  ))}
                </div>
              </div>
            );
  
            default:
              return null;
          }
        })}
      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 mt-6 text-xs text-color6 md:text-base">
        <div className="flex items-center gap-2 ml-auto md:ml-0">
        <div className="bg-color3 rounded-md py-1 px-2">
          <button className="flex items-center gap-1 text-color7 hover:text-color5">
            <Search className="w-4 h-4" /> Ask Sources
          </button>
        </div>
        <div className="bg-color3 rounded-md py-1 px-2">
          <button className="flex items-center gap-1 text-color7 hover:text-color5">
            <Eye className="w-4 h-4" /> Visualise
          </button>
        </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="flex gap-2 p-2 bg-color3 rounded-md">
            <button><ThumbsUp className="w-4 h-4 text-color7 hover:text-color5 " /></button>
            <button><ThumbsDown className="w-4 h-4 text-color7 hover:text-color5" /></button>
          </div>
          <button className="p-2 bg-color3 rounded-md"><Repeat className="w-4 h-4 text-color7 hover:text-color5" /></button>
          <button className="p-2 bg-color3 rounded-md"><Copy className="w-4 h-4 text-color7 hover:text-color5" /></button>
          <button className="p-2 bg-color3 rounded-md"><Download className="w-4 h-4 text-color7 hover:text-color5" /></button>
        </div>
      </div>
      <div className="h-[1px] w-full bg-stone-300 mt-4 mb-12"></div>
    </div>
  );
}

export default MessageContent;
