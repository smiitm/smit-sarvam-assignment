'use client';

import Image from 'next/image';

interface HomeCardProps {
  imageUrl?: string;
  title: string;
  subtitle: string;
  details?: string;
  label?: string;
}

export function HomeCard({ imageUrl, title, subtitle, details, label }: HomeCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-color2 rounded-lg hover:bg-color3 transition-colors cursor-pointer">
      {imageUrl && (
        <Image src={imageUrl} alt={title} width={40} height={40} className="w-10 h-10 rounded object-cover" />
      )}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-medium">{title}</span>
          {label && <span className="text-sm text-gray-400">{label}</span>}
        </div>
        <div className="text-sm text-gray-400 flex items-center gap-2">
          <span>{subtitle}</span>
          {details && (
            <>
              <span className="text-[#2C2D32]">•</span>
              <span>{details}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
