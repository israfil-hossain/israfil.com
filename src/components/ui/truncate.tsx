'use client';

import { useState } from 'react';

interface TruncateProps {
  text: string;
  limit?: number;
  className?: string;
}

export default function Truncate({ text, limit = 100, className = '' }: TruncateProps) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isTruncated = text.length > limit;
  const displayText = expanded || !isTruncated ? text : text.slice(0, limit) + '...';

  return (
    <p className={className}>
      {displayText}
      {isTruncated && (
        <span
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 cursor-pointer ml-2"
        >
          {expanded ? 'Read less' : 'Read more'}
        </span>
      )}
    </p>
  );
}
