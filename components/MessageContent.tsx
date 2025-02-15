"use client"
import { FileText, BookOpen } from "lucide-react";

interface Source {
  url: string;
  name: string;
}

interface Block {
  type: 'heading' | 'paragraph' | 'list' | 'references' | 'inline-reference';
  text?: string;
  items?: (string | { text: string; reference?: string })[]; 
  sources?: Source[];
}


interface MessageContentProps {
  content: Block[];
}
function MessageContent({ content }: MessageContentProps) {
  return (
    <div>
      {content.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return <h3 key={index} className="text-lg font-bold my-2">{block.text}</h3>;

          case 'paragraph':
            return (
              <p key={index} className="text-gray-700 my-2">
                {block.text}{' '}
                {block.sources?.map((source, idx) => (
                  <span className="bg-color2 px-2 py-1 text-sm rounded-full text-gray-600 ml-1">
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
                    <li key={idx} className="text-gray-700 py-1">{item}</li>
                  ) : (
                    <li key={idx} className="text-gray-700 py-1">
                      {item.text}{' '}
                      {item.reference && (
                        <div className="inline-block bg-color2 px-2 py-1 text-xs rounded-full text-gray-600 ml-1">
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
                <div key={index} className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-gray-600" />
                      <h4 className="text-md font-semibold text-gray-800">Sources</h4>
                    </div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto overflow-hidden scrollbar-hide">
                    {block.sources?.map((source, idx) => (
                      <a
                        key={idx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-color2 px-3 py-2 rounded-lg text-gray-700 text-sm whitespace-nowrap "
                      >
                        <FileText className="w-4 h-4 text-gray-500" />
                        {source.name}
                      </a>
                    ))}
                  </div>
                </div>
              );

          default:
            return null;
        }
      })}
    </div>
  );
}


export default MessageContent;
